import { animals, type Animal } from "./data"

//desactiva el filtro y muestra todos los animales
const ALL = "Todos"

function escapeHtml(text: string): string {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

const categories = [
  ALL,
  ...Array.from(new Set(animals.map((a) => a.category))),
] as string[]

let currentFilter = ALL

const filtersEl = document.querySelector<HTMLDivElement>("#filters")!
const gridEl = document.querySelector<HTMLDivElement>("#grid")!
const dialogEl = document.querySelector<HTMLDialogElement>("#detail")!
const detailBodyEl = document.querySelector<HTMLDivElement>("#detail-body")!
const detailWikiEl = document.querySelector<HTMLAnchorElement>("#detail-wiki")!
const detailCloseEl = document.querySelector<HTMLButtonElement>("#detail-close")!

//detecta que filtro se ha seleccionado y muestra solo esos animales 
function filtered(): Animal[] {
  if (currentFilter === ALL) return animals
  return animals.filter((a) => a.category === currentFilter)
}

//renderiza los filtros en el DOM
function renderFilters(): void {
  filtersEl.innerHTML = categories
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

//renderiza el HTML de cada animal en la cuadrícula
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

//renderiza la cuadrícula en el DOM
function renderGrid(): void {
  gridEl.innerHTML = filtered().map(cardHtml).join("")
  gridEl.querySelectorAll<HTMLButtonElement>("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.open
      const animal = animals.find((x) => x.id === id)
      if (animal) openDetail(animal)
    })
  })
}

//muestra los detalles de un animal en el diálogo
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

//cierra el diálogo
detailCloseEl.addEventListener("click", () => dialogEl.close())

dialogEl.addEventListener("click", (e) => {
  const t = e.target as HTMLElement
  if (t.nodeName === "DIALOG") dialogEl.close()
})

renderFilters()
renderGrid()
