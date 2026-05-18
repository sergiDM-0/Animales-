import { getApiBaseUrl, loadAnimals } from "./api"
import type { Animal } from "./types"

const ALL = "Todos"

function escapeHtml(text: string): string {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

const dbStatusEl = document.querySelector<HTMLDivElement>("#db-status")!
const filtersEl = document.querySelector<HTMLDivElement>("#filters")!
const gridEl = document.querySelector<HTMLDivElement>("#grid")!
const dialogEl = document.querySelector<HTMLDialogElement>("#detail")!
const detailBodyEl = document.querySelector<HTMLDivElement>("#detail-body")!
const detailWikiEl = document.querySelector<HTMLAnchorElement>("#detail-wiki")!
const detailCloseEl = document.querySelector<HTMLButtonElement>("#detail-close")!

let animals: Animal[] = []
let currentFilter = ALL

function categories(): string[] {
  return [ALL, ...Array.from(new Set(animals.map((a) => a.category)))]
}

function filtered(): Animal[] {
  if (currentFilter === ALL) return animals
  return animals.filter((a) => a.category === currentFilter)
}

function renderFilters(): void {
  filtersEl.innerHTML = categories()
    .map((cat) => {
      const active = cat === currentFilter ? " is-active" : ""
      return `<button type="button" class="chip${active}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
    })
    .join("")

  filtersEl.querySelectorAll<HTMLButtonElement>(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.cat ?? ALL
      renderFilters()
      renderGrid()
    })
  })
}

function cardHtml(a: Animal): string {
  const desc = a.description.length > 160 ? `${a.description.slice(0, 160)}…` : a.description
  return `
    <article class="card">
      <img class="card-img" src="${escapeHtml(a.image)}" alt="" width="800" height="450" loading="lazy" />
      <div class="card-body">
        <div class="card-head">
          <h2 class="card-title">${escapeHtml(a.name)}</h2>
          <span class="pill">${escapeHtml(a.category)}</span>
        </div>
        <p class="card-sci">${escapeHtml(a.scientificName)}</p>
        <p class="card-desc">${escapeHtml(desc)}</p>
        <div class="card-actions">
          <button type="button" class="btn btn-primary" data-open="${escapeHtml(a.id)}">Ver más</button>
          <a class="btn btn-outline" href="${escapeHtml(a.wikiUrl)}" target="_blank" rel="noreferrer">Wiki</a>
        </div>
      </div>
    </article>
  `
}

function renderGrid(): void {
  if (animals.length === 0) {
    gridEl.innerHTML = `<p class="status-message">No hay animales en la base de datos. Ejecuta <code>npm run seed</code>.</p>`
    return
  }

  const list = filtered()
  if (list.length === 0) {
    gridEl.innerHTML = `<p class="status-message">Ningún animal en esta categoría.</p>`
    return
  }

  gridEl.innerHTML = list.map(cardHtml).join("")
  gridEl.querySelectorAll<HTMLButtonElement>("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.open
      const animal = animals.find((x) => x.id === id)
      if (animal) openDetail(animal)
    })
  })
}

function openDetail(a: Animal): void {
  detailWikiEl.href = a.wikiUrl
  detailBodyEl.innerHTML = `
    <h2 class="detail-title">${escapeHtml(a.name)}</h2>
    <p class="detail-sci">${escapeHtml(a.scientificName)}</p>
    <img class="detail-img" src="${escapeHtml(a.image)}" alt="" loading="lazy" />
    <p class="detail-text">${escapeHtml(a.description)}</p>
    <dl class="detail-dl">
      <div><dt>Hábitat</dt><dd>${escapeHtml(a.habitat)}</dd></div>
      <div><dt>Dieta</dt><dd>${escapeHtml(a.diet)}</dd></div>
      <div><dt>Categoría</dt><dd><span class="pill">${escapeHtml(a.category)}</span></dd></div>
    </dl>
  `
  dialogEl.showModal()
}

function showDbStatusLoading(): void {
  dbStatusEl.className = "db-status db-status--loading"
  dbStatusEl.textContent = "Conectando con la API y leyendo la base de datos…"
}

function showDbStatusOk(count: number): void {
  dbStatusEl.className = "db-status db-status--ok"
  dbStatusEl.innerHTML = `
    <span><strong>${count}</strong> animales cargados desde la base de datos (SQLite · PocketBase)</span>
    <span class="db-status__url">${escapeHtml(getApiBaseUrl())}</span>
    <button type="button" class="db-status__reload" id="reload-db">Actualizar</button>
  `
  document.querySelector<HTMLButtonElement>("#reload-db")?.addEventListener("click", () => {
    void fetchFromDatabase()
  })
}

function showDbStatusError(message: string): void {
  dbStatusEl.className = "db-status db-status--error"
  dbStatusEl.textContent = message
}

function showLoading(): void {
  showDbStatusLoading()
  filtersEl.innerHTML = ""
  gridEl.innerHTML = `<p class="status-message status-message--loading">Cargando animales desde la base de datos…</p>`
}

function showError(message: string): void {
  filtersEl.innerHTML = ""
  gridEl.innerHTML = `<p class="status-message status-message--error">${escapeHtml(message)}</p>`
}

detailCloseEl.addEventListener("click", () => dialogEl.close())

dialogEl.addEventListener("click", (e) => {
  const t = e.target as HTMLElement
  if (t.nodeName === "DIALOG") dialogEl.close()
})

async function fetchFromDatabase(): Promise<void> {
  showLoading()
  try {
    animals = await loadAnimals()
    currentFilter = ALL
    showDbStatusOk(animals.length)
    renderFilters()
    renderGrid()
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Error desconocido"
    showDbStatusError(
      `Sin conexión a la API. Arranca PocketBase (npm run pb:serve) y ejecuta npm run seed si la base está vacía.`,
    )
    const hint =
      "¿Está PocketBase en marcha? Ejecuta <code>npm run pb:serve</code> y luego <code>npm run seed</code>."
    showError(`No se pudieron cargar los animales (${escapeHtml(detail)}). ${hint}`)
  }
}

void fetchFromDatabase()
