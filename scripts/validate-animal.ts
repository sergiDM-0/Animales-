import type { AnimalInput } from "../src/types"

export type ValidationSeverity = "error" | "warning"

export type ValidationIssue = {
  code: string
  severity: ValidationSeverity
  message: string
}

export type ValidationResult = {
  ok: boolean
  issues: ValidationIssue[]
  /** Imagen sugerida desde Wikipedia cuando la actual parece genérica o incorrecta */
  suggestedImage?: string
  /** Animal con imagen corregida (si --fix y hay sugerencia) */
  corrected?: AnimalInput
}

type WikiSummary = {
  type?: string
  title?: string
  extract?: string
  thumbnail?: { source?: string }
  content_urls?: { desktop?: { page?: string } }
}

const MIN_DESCRIPTION_LENGTH = 50
const MIN_IMAGE_BYTES = 4_000

const PLACEHOLDER_IMAGE_PATTERNS = [
  /placeholder/i,
  /dummyimage/i,
  /picsum\.photos/i,
  /via\.placeholder/i,
  /wikipedia-logo\.png/i,
  /default\.svg/i,
  /1x1\.(png|gif)/i,
]

const TRUSTED_IMAGE_HOSTS = [
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "static.wikia.nocookie.net",
]

const GENERIC_STOCK_HOSTS = ["images.unsplash.com", "plus.unsplash.com", "images.pexels.com"]

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
}

function keywordsFromAnimal(animal: AnimalInput): string[] {
  const words = new Set<string>()
  const addTokens = (text: string) => {
    for (const token of normalize(text).split(/[\s,.-]+/)) {
      if (token.length >= 3) words.add(token)
    }
  }
  addTokens(animal.name)
  addTokens(animal.scientificName)
  const genus = animal.scientificName.split(/\s+/)[0]
  if (genus && genus.length >= 4) words.add(normalize(genus))
  return [...words]
}

function wikiTitleFromUrl(wikiUrl: string): string | null {
  try {
    const u = new URL(wikiUrl)
    if (!u.hostname.includes("wikipedia.org")) return null
    const segment = u.pathname.split("/wiki/")[1]
    return segment ? decodeURIComponent(segment) : null
  } catch {
    return null
  }
}

async function fetchWikiSummary(title: string): Promise<WikiSummary | null> {
  const encoded = encodeURIComponent(title.replace(/ /g, "_"))
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encoded}`
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "EnciclopediaAnimales/1.0 (validate)" },
      signal: AbortSignal.timeout(12_000),
    })
    if (!res.ok) return null
    return (await res.json()) as WikiSummary
  } catch {
    return null
  }
}

async function checkImageUrl(imageUrl: string): Promise<{
  reachable: boolean
  isImage: boolean
  contentType?: string
  size?: number
}> {
  try {
    const head = await fetch(imageUrl, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    })
    if (head.ok) {
      const ct = head.headers.get("content-type") ?? ""
      const len = Number(head.headers.get("content-length") ?? 0)
      if (ct.startsWith("image/")) {
        return { reachable: true, isImage: true, contentType: ct, size: len || undefined }
      }
    }

    const get = await fetch(imageUrl, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(12_000),
      headers: { Range: "bytes=0-8191" },
    })
    const ct = get.headers.get("content-type") ?? ""
    const len = Number(get.headers.get("content-length") ?? 0)
    return {
      reachable: get.ok,
      isImage: ct.startsWith("image/"),
      contentType: ct,
      size: len || undefined,
    }
  } catch {
    return { reachable: false, isImage: false }
  }
}

function isPlaceholderImage(url: string): boolean {
  return PLACEHOLDER_IMAGE_PATTERNS.some((p) => p.test(url))
}

function isTrustedHost(hostname: string): boolean {
  return TRUSTED_IMAGE_HOSTS.some((h) => hostname === h || hostname.endsWith(`.${h}`))
}

function imageUrlMentionsAnimal(url: string, keywords: string[]): boolean {
  const haystack = normalize(decodeURIComponent(url))
  return keywords.some((kw) => haystack.includes(kw))
}

function descriptionMentionsAnimal(animal: AnimalInput): boolean {
  const desc = normalize(animal.description)
  const keywords = keywordsFromAnimal(animal)
  const genus = normalize(animal.scientificName.split(/\s+/)[0] ?? "")
  const nameMatch = keywords.some((kw) => desc.includes(kw))
  const genusMatch = genus.length >= 4 && desc.includes(genus)
  const titleMatch = normalize(animal.name)
    .split(/\s+/)
    .filter((w) => w.length >= 4)
    .some((w) => desc.includes(w))
  return nameMatch || genusMatch || titleMatch
}

function validateTextFields(animal: AnimalInput): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!animal.name.trim()) {
    issues.push({ code: "NAME_EMPTY", severity: "error", message: "Falta el nombre." })
  }

  const sci = animal.scientificName.trim()
  if (sci.length < 3 || /^\d/.test(sci)) {
    issues.push({
      code: "SCIENTIFIC_FORMAT",
      severity: "warning",
      message: `Nombre científico dudoso: «${animal.scientificName}».`,
    })
  }

  if (animal.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    issues.push({
      code: "DESCRIPTION_SHORT",
      severity: "error",
      message: "La descripción es demasiado corta o vacía.",
    })
  }

  if (!descriptionMentionsAnimal(animal)) {
    issues.push({
      code: "DESCRIPTION_MISMATCH",
      severity: "error",
      message:
        "La descripción no parece hablar de este animal (no menciona el nombre ni el género científico).",
    })
  }

  if (!animal.habitat.trim()) {
    issues.push({ code: "HABITAT_EMPTY", severity: "error", message: "Falta el hábitat." })
  }

  if (!animal.diet.trim()) {
    issues.push({ code: "DIET_EMPTY", severity: "error", message: "Falta la dieta." })
  }

  try {
    new URL(animal.wikiUrl)
  } catch {
    issues.push({ code: "WIKI_INVALID", severity: "warning", message: "URL de Wikipedia inválida." })
  }

  return issues
}

async function validateImage(
  animal: AnimalInput,
  wikiSummary: WikiSummary | null,
  duplicateImageUrls: Set<string>,
): Promise<{ issues: ValidationIssue[]; suggestedImage?: string }> {
  const issues: ValidationIssue[] = []
  let suggestedImage: string | undefined

  const imageUrl = animal.image.trim()
  if (!imageUrl) {
    issues.push({ code: "IMAGE_EMPTY", severity: "error", message: "Falta la URL de imagen." })
    return { issues }
  }

  try {
    new URL(imageUrl)
  } catch {
    issues.push({ code: "IMAGE_INVALID_URL", severity: "error", message: "URL de imagen inválida." })
    return { issues }
  }

  if (isPlaceholderImage(imageUrl)) {
    issues.push({
      code: "IMAGE_PLACEHOLDER",
      severity: "error",
      message: "La imagen parece un marcador genérico, no una foto del animal.",
    })
  }

  if (duplicateImageUrls.has(imageUrl)) {
    issues.push({
      code: "IMAGE_DUPLICATE",
      severity: "error",
      message:
        "La misma URL de imagen se usa para otro animal; probable foto genérica o incorrecta.",
    })
  }

  const keywords = keywordsFromAnimal(animal)
  let hostname = ""
  try {
    hostname = new URL(imageUrl).hostname
  } catch {
    /* ya reportado */
  }

  const trusted = isTrustedHost(hostname)
  const genericStock = GENERIC_STOCK_HOSTS.some((h) => hostname.includes(h))

  if (genericStock && !imageUrlMentionsAnimal(imageUrl, keywords)) {
    issues.push({
      code: "IMAGE_GENERIC_STOCK",
      severity: "error",
      message:
        "Imagen de banco genérico (Unsplash/Pexels) sin relación evidente con el animal en la URL.",
    })
  }

  if (!trusted && !imageUrlMentionsAnimal(imageUrl, keywords)) {
    issues.push({
      code: "IMAGE_NO_KEYWORD",
      severity: "warning",
      message: "La URL de la imagen no sugiere que sea de este animal.",
    })
  }

  const probe = await checkImageUrl(imageUrl)
  if (!probe.reachable) {
    issues.push({
      code: "IMAGE_UNREACHABLE",
      severity: "error",
      message: "No se puede acceder a la imagen (enlace roto o bloqueado).",
    })
  } else if (!probe.isImage) {
    issues.push({
      code: "IMAGE_NOT_IMAGE",
      severity: "error",
      message: `La URL no devuelve una imagen (${probe.contentType ?? "tipo desconocido"}).`,
    })
  } else if (probe.size !== undefined && probe.size > 0 && probe.size < MIN_IMAGE_BYTES) {
    issues.push({
      code: "IMAGE_TOO_SMALL",
      severity: "warning",
      message: "La imagen es muy pequeña; podría ser un icono o miniatura irrelevante.",
    })
  }

  const wikiThumb = wikiSummary?.thumbnail?.source
  if (wikiThumb && wikiThumb !== imageUrl) {
    const thumbHost = new URL(wikiThumb).hostname
    const sameOrigin =
      hostname === thumbHost ||
      (genericStock && isTrustedHost(thumbHost)) ||
      (genericStock && !trusted)

    if (sameOrigin || genericStock || !trusted) {
      suggestedImage = wikiThumb
      const hasImageError = issues.some(
        (i) =>
          i.severity === "error" &&
          i.code.startsWith("IMAGE_") &&
          i.code !== "IMAGE_NO_KEYWORD",
      )
      if (hasImageError || genericStock) {
        issues.push({
          code: "IMAGE_WIKI_ALTERNATIVE",
          severity: "warning",
          message: "Wikipedia tiene otra imagen que parece más adecuada para este animal.",
        })
      }
    }
  }

  if (wikiSummary?.type === "disambiguation") {
    issues.push({
      code: "WIKI_DISAMBIGUATION",
      severity: "warning",
      message: "El artículo de Wikipedia es una desambiguación; el contenido puede no ser el animal.",
    })
  }

  return { issues, suggestedImage }
}

async function validateWithWikipedia(
  animal: AnimalInput,
): Promise<{ issues: ValidationIssue[]; wikiSummary: WikiSummary | null }> {
  const issues: ValidationIssue[] = []
  const title = wikiTitleFromUrl(animal.wikiUrl)
  if (!title) return { issues, wikiSummary: null }

  const wikiSummary = await fetchWikiSummary(title)
  if (!wikiSummary?.extract) {
    issues.push({
      code: "WIKI_NOT_FOUND",
      severity: "warning",
      message: "No se pudo verificar el artículo en Wikipedia.",
    })
    return { issues, wikiSummary: null }
  }

  const extract = normalize(wikiSummary.extract)
  const keywords = keywordsFromAnimal(animal)
  const wikiMentionsAnimal = keywords.some((kw) => extract.includes(kw))

  if (!wikiMentionsAnimal) {
    issues.push({
      code: "WIKI_CONTENT_MISMATCH",
      severity: "error",
      message:
        "El resumen de Wikipedia no parece corresponder a este animal (nombre o género no encontrados).",
    })
  }

  const descStart = normalize(animal.description).slice(0, 80)
  const wikiStart = extract.slice(0, 80)
  if (
    descStart.length > 30 &&
    wikiStart.length > 30 &&
    !extract.includes(descStart.slice(0, 40)) &&
    !normalize(animal.description).includes(wikiStart.slice(0, 40))
  ) {
    issues.push({
      code: "DESCRIPTION_WIKI_DRIFT",
      severity: "warning",
      message: "La descripción local difiere mucho del resumen de Wikipedia.",
    })
  }

  return { issues, wikiSummary }
}

export type ValidateOptions = {
  /** Si true, las advertencias también bloquean el guardado */
  strict?: boolean
  /** Reemplazar imagen por la sugerida de Wikipedia cuando hay problemas */
  fixImage?: boolean
  /** URLs de imagen ya usadas por otros animales en el mismo lote */
  usedImageUrls?: Set<string>
  /** Omitir llamadas a Wikipedia (más rápido, menos preciso) */
  skipWiki?: boolean
}

/**
 * Valida un animal antes de guardarlo en la base de datos.
 * Comprueba texto, coherencia con Wikipedia e imagen (placeholder, duplicada, rota o genérica).
 */
export async function validateAnimal(
  animal: AnimalInput,
  options: ValidateOptions = {},
): Promise<ValidationResult> {
  const issues: ValidationIssue[] = [...validateTextFields(animal)]

  let wikiSummary: WikiSummary | null = null
  if (!options.skipWiki) {
    const wiki = await validateWithWikipedia(animal)
    issues.push(...wiki.issues)
    wikiSummary = wiki.wikiSummary
  }

  const imageResult = await validateImage(
    animal,
    wikiSummary,
    options.usedImageUrls ?? new Set<string>(),
  )
  issues.push(...imageResult.issues)

  const hasError = issues.some((i) => i.severity === "error")
  const hasWarning = issues.some((i) => i.severity === "warning")
  const ok = options.strict ? !hasError && !hasWarning : !hasError

  let corrected: AnimalInput | undefined
  let suggestedImage = imageResult.suggestedImage

  if (options.fixImage && suggestedImage) {
    const imageErrors = issues.filter(
      (i) => i.severity === "error" && i.code.startsWith("IMAGE_"),
    )
    if (imageErrors.length > 0) {
      corrected = { ...animal, image: suggestedImage }
    }
  }

  return { ok, issues, suggestedImage, corrected }
}

/** Registra en consola el resultado de validación */
export function printValidationResult(animal: AnimalInput, result: ValidationResult): void {
  if (result.ok && result.issues.length === 0) {
    console.log(`  ✓ ${animal.name} — validación correcta`)
    return
  }
  if (result.ok) {
    console.log(`  ~ ${animal.name} — válido con advertencias:`)
  } else {
    console.log(`  ✗ ${animal.name} — rechazado:`)
  }
  for (const issue of result.issues) {
    const icon = issue.severity === "error" ? "    ERROR" : "    aviso"
    console.log(`${icon} [${issue.code}] ${issue.message}`)
  }
  if (result.suggestedImage && !result.corrected) {
    console.log(`    → Imagen sugerida: ${result.suggestedImage}`)
  }
  if (result.corrected) {
    console.log(`    → Imagen corregida automáticamente (Wikipedia)`)
  }
}

/** Detecta URLs de imagen repetidas en un catálogo (sospecha de fotos random) */
export function findDuplicateImageUrls(catalog: AnimalInput[]): Map<string, string[]> {
  const byUrl = new Map<string, string[]>()
  for (const animal of catalog) {
    const url = animal.image.trim()
    const list = byUrl.get(url) ?? []
    list.push(animal.scientificName)
    byUrl.set(url, list)
  }
  return new Map([...byUrl.entries()].filter(([, names]) => names.length > 1))
}
