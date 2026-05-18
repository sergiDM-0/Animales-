import PocketBase from "pocketbase"
import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { animals as baseAnimals } from "../src/data"
import type { AnimalInput } from "../src/types"
import {
  findDuplicateImageUrls,
  printValidationResult,
  validateAnimal,
} from "./validate-animal"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PB_URL = process.env.PB_URL ?? "http://127.0.0.1:8090"
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD

type WikiEntry = {
  wikiTitle: string
  scientificName: string
  category: AnimalInput["category"]
  habitat: string
  diet: string
}

type WikiSummary = {
  title?: string
  extract?: string
  thumbnail?: { source?: string }
  content_urls?: { desktop?: { page?: string } }
}

function loadExtraCatalog(): AnimalInput[] {
  const file = path.join(__dirname, "../src/animals-extra.json")
  return JSON.parse(readFileSync(file, "utf-8")) as AnimalInput[]
}

function loadWikiList(): WikiEntry[] {
  const file = path.join(__dirname, "../src/wiki-import-list.json")
  return JSON.parse(readFileSync(file, "utf-8")) as WikiEntry[]
}

function mergeCatalog(...lists: AnimalInput[][]): AnimalInput[] {
  const seen = new Set<string>()
  const out: AnimalInput[] = []
  for (const list of lists) {
    for (const animal of list) {
      const key = animal.scientificName.trim().toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      out.push(animal)
    }
  }
  return out
}

async function fetchWikiAnimal(entry: WikiEntry): Promise<AnimalInput | null> {
  const title = encodeURIComponent(entry.wikiTitle.replace(/ /g, "_"))
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${title}`
  const res = await fetch(url, {
    headers: { "User-Agent": "EnciclopediaAnimales/1.0 (educational project)" },
  })
  if (!res.ok) {
    console.warn(`  ⚠ Wikipedia sin datos: ${entry.wikiTitle} (${res.status})`)
    return null
  }
  const data = (await res.json()) as WikiSummary
  const description = data.extract?.trim()
  if (!description) return null

  return {
    name: data.title ?? entry.wikiTitle,
    scientificName: entry.scientificName,
    description,
    habitat: entry.habitat,
    diet: entry.diet,
    image:
      data.thumbnail?.source ??
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Wikipedia-logo.png/320px-Wikipedia-logo.png",
    wikiUrl: data.content_urls?.desktop?.page ?? `https://es.wikipedia.org/wiki/${title}`,
    category: entry.category,
  }
}

async function importViaApi(catalog: AnimalInput[]): Promise<void> {
  if (!PB_ADMIN_EMAIL || !PB_ADMIN_PASSWORD) {
    console.error("Define PB_ADMIN_EMAIL y PB_ADMIN_PASSWORD en .env")
    process.exit(1)
  }

  const skipValidation = process.argv.includes("--skip-validation")
  const strict = process.argv.includes("--strict")
  const fixImage = process.argv.includes("--fix")

  const pb = new PocketBase(PB_URL)

  try {
    await pb.health.check()
  } catch {
    console.error(`PocketBase no responde en ${PB_URL}. Ejecuta: npm run pb:serve`)
    process.exit(1)
  }

  await pb.collection("_superusers").authWithPassword(PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD)

  const existing = await pb.collection("animals").getFullList<{ scientificName: string }>({
    fields: "scientificName",
  })
  const existingKeys = new Set(
    existing.map((r) => r.scientificName.trim().toLowerCase()),
  )

  const duplicateImageUrls = findDuplicateImageUrls(catalog)
  const suspiciousImageUrls = new Set(duplicateImageUrls.keys())

  let created = 0
  let skipped = 0
  let failed = 0
  let rejected = 0

  console.log(`Importando ${catalog.length} animales vía API (${PB_URL})…`)
  if (!skipValidation) {
    console.log(
      "Validación activa: imagen + contenido (usa --skip-validation para omitir, --fix para corregir imagen con Wikipedia)\n",
    )
  } else {
    console.log("")
  }

  for (const animal of catalog) {
    const key = animal.scientificName.trim().toLowerCase()
    if (existingKeys.has(key)) {
      skipped++
      continue
    }

    let toSave = animal

    if (!skipValidation) {
      const validation = await validateAnimal(animal, {
        strict,
        fixImage,
        usedImageUrls: suspiciousImageUrls,
        skipWiki: false,
      })

      if (validation.corrected) {
        toSave = validation.corrected
      }

      if (!validation.ok) {
        rejected++
        printValidationResult(animal, validation)
        continue
      }

      if (validation.issues.length > 0) {
        printValidationResult(animal, validation)
      }
    }

    try {
      await pb.collection("animals").create(toSave)
      existingKeys.add(key)
      suspiciousImageUrls.add(toSave.image.trim())
      created++
      if (skipValidation || toSave === animal) {
        console.log(`  + ${toSave.name}`)
      } else {
        console.log(`  + ${toSave.name} (imagen corregida)`)
      }
    } catch (err) {
      failed++
      const msg = err instanceof Error ? err.message : String(err)
      console.warn(`  ✗ ${toSave.name}: ${msg}`)
    }
  }

  const total = await pb.collection("animals").getList(1, 1)
  console.log(
    `\nListo: ${created} creados, ${skipped} ya existían, ${rejected} rechazados por validación, ${failed} fallidos.`,
  )
  console.log(`Total en base de datos: ${total.totalItems}`)
}

async function main(): Promise<void> {
  const useWikipedia = process.argv.includes("--wikipedia")
  const extraOnly = process.argv.includes("--extra-only")

  let catalog: AnimalInput[]

  if (useWikipedia) {
    console.log("Modo Wikipedia: descargando fichas y guardando en PocketBase…\n")
    const list = loadWikiList()
    const fetched: AnimalInput[] = []
    for (const entry of list) {
      const animal = await fetchWikiAnimal(entry)
      if (animal) fetched.push(animal)
      await new Promise((r) => setTimeout(r, 120))
    }
    catalog = fetched
  } else if (extraOnly) {
    catalog = loadExtraCatalog()
  } else {
    catalog = mergeCatalog(baseAnimals, loadExtraCatalog())
  }

  await importViaApi(catalog)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
