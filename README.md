# Documentación del proyecto (versión simple)

Este proyecto es una “enciclopedia de animales” en **HTML + CSS + TypeScript** usando **Vite** como servidor de desarrollo y herramienta de build.

La carpeta `dist/` y sus `assets/` son **salida generada** por `vite build` (no se editan a mano).

---

## Estructura

- **`index.html`**: HTML base (punto de entrada de la app en desarrollo).
- **`src/`**: código fuente (TypeScript, CSS, datos).
  - **`src/main.ts`**: lógica de UI (render, filtros, diálogo).
  - **`src/data.ts`**: datos y tipos de animales.
  - **`src/style.css`**: estilos (layout, tarjetas, botones, diálogo).
- **`vite.config.ts`**: configuración mínima de Vite.
- **`tsconfig.json`**: configuración del compilador TypeScript.
- **`dist/`**: salida de producción generada por Vite.
  - **`dist/index.html`**: HTML final con links a assets con hash.
  - **`dist/assets/*.js`**: JavaScript empaquetado/minificado.
  - **`dist/assets/*.css`**: CSS empaquetado/minificado.

---

## `index.html` (raíz)

Archivo: `animales/index.html`

### Responsabilidad

- Define la estructura base del documento: `<head>`, `<body>` y los contenedores.
- Carga el CSS de desarrollo: `/<link rel="stylesheet" href="/src/style.css" />`.
- Carga el entrypoint TypeScript: `<script type="module" src="/src/main.ts"></script>`.

### Elementos “ancla” para el código

Estos elementos se buscan desde `src/main.ts` para montar la UI:

- **`#filters`**: contenedor para los botones “chip” de categorías.
- **`#grid`**: contenedor para las tarjetas de animales.
- **`#detail`**: `<dialog>` nativo para mostrar un animal en detalle.
- **`#detail-body`**: contenido interno del diálogo.
- **`#detail-wiki`**: enlace “Wikipedia” del diálogo.
- **`#detail-close`**: botón “Cerrar” del diálogo.

---

## `src/data.ts`

Archivo: `animales/src/data.ts`

### Responsabilidadd

Contiene:

- **`Animal`**: interfaz TypeScript con el “shape” de los datos.
- **`animals`**: array con los animales (id, nombre, descripción, etc.).

### Detalles importantes

- El campo **`category`** es un *union type*:
  - `"Mamífero" | "Ave" | "Reptil" | "Anfibio" | "Pez" | "Invertebrado"`
- En `src/main.ts` se usa para:
  - calcular categorías únicas (filtros)
  - filtrar el grid por categoría
  - renderizar la “pill” de categoría en tarjeta y detalle

---

## `src/main.ts` (lógica de la app)

Archivo: `animales/src/main.ts`

### Responsabilidad general

- Importa `animals` y `Animal` desde `./data`.
- Construye las categorías disponibles.
- Renderiza:
  - **filtros** (chips)
  - **grid** de tarjetas
  - **detalle** de un animal en un `<dialog>`
- Maneja eventos:
  - click en chips (cambiar filtro)
  - click en “Ver más” (abrir detalle)
  - cerrar diálogo (botón o click en el backdrop)

### Variables clave

- **`ALL`**: string `"Todos"` para el estado “sin filtro”.
- **`categories`**: `["Todos", ...categorías únicas de animals]`.
- **`currentFilter`**: estado actual del filtro (string).

### Utilidad de seguridad: `escapeHtml`

Función:

- Crea un `<div>`, asigna `textContent` y devuelve `innerHTML`.
- Se usa para evitar inyectar HTML no deseado cuando se arma HTML con template strings.

> Nota: aquí los datos vienen de un archivo local, pero igualmente es una buena práctica si en el futuro los datos vinieran de API o input del usuario.

### Render de filtros: `renderFilters()`

- Genera botones con clase `chip` y un `data-cat="..."`.
- Marca activo con `is-active`.
- Registra listeners para:
  - actualizar `currentFilter`
  - re-render de filtros y grid

### Render de tarjetas: `cardHtml(a)`

- Construye el HTML de una tarjeta.
- Corta la descripción a ~160 caracteres para la vista previa.
- Inserta:
  - imagen
  - nombre, categoría, nombre científico
  - descripción recortada
  - acciones (“Ver más” y enlace a Wiki)

### Render del grid: `renderGrid()`

- Inserta todas las tarjetas en `#grid`.
- Busca los botones `data-open="id"` y añade listeners:
  - encontrar el animal por `id`
  - abrir el diálogo con `openDetail(animal)`

### Diálogo nativo: `openDetail(a)`

- Rellena `#detail-body` con el contenido completo.
- Actualiza el `href` de `#detail-wiki`.
- Abre el diálogo con `dialogEl.showModal()`.

### Cierre del diálogo

- Botón “Cerrar” (id `detail-close`) llama a `dialogEl.close()`.
- Click en el backdrop: si el target del click es el propio `<dialog>`, se cierra.

---

## `src/style.css` (estilos)

Archivo: `animales/src/style.css`

### Responsabilidades

Define estilos “vanilla” para:

- Layout general (`.wrap`, `.site-header`, `.grid`)
- Filtros (`.filters`, `.chip`, `.chip.is-active`)
- Tarjetas (`.card`, `.card-img`, `.card-body`, etc.)
- Botones (`.btn`, variantes `btn-primary`, `btn-outline`, `btn-ghost`)
- Diálogo de detalle (`.detail-dialog` y elementos internos)

### Variables CSS (tema simple)

En `:root` se definen tokens de color y UI:

- `--bg`, `--surface`, `--text`, `--muted`, `--border`
- `--accent`, `--accent-contrast`
- `--radius`, `--shadow`

### Recorte de descripción (line clamp)

En `.card-desc` se usa un clamp de líneas (estilo “3 líneas máximo”) con:

- `display: -webkit-box;`
- `-webkit-line-clamp: 3;`
- `-webkit-box-orient: vertical;`
- `overflow: hidden;`

---

## `vite.config.ts`

Archivo: `animales/vite.config.ts`

### Responsabilida

Config mínima de Vite:

- `root: "."` indica que el root del proyecto es la carpeta actual.

Vite se encarga de:

- servir `index.html` en dev
- resolver imports TypeScript
- empaquetar/minificar para producción (dist)

---

## `tsconfig.json`

Archivo: `animales/tsconfig.json`

### Objetivo

Configurar TypeScript para trabajar con:

- **módulos ES** (`module: "ESNext"`)
- resolución “bundler” (pensada para Vite)
- DOM types disponibles (`lib: ["ES2022", "DOM", "DOM.Iterable"]`)
- modo estricto (`strict: true`)

### Nota importante sobre build

Aquí `noEmit: true` significa que TypeScript **no genera** archivos `.js` por su cuenta.

- El “build” real de JavaScript lo hace **Vite** (esbuild/rollup internamente).
- TypeScript se usa para **typecheck**.

---

## `dist/` (producción) y `dist/assets/`

### Qué es `dist/`

`dist/` es el resultado de ejecutar `npm run build` (que llama a `vite build`).

En producción:

- El navegador ya no carga `/src/main.ts` directamente.
- Carga **assets compilados** en `dist/assets/`.

### `dist/index.html`

Archivo: `animales/dist/index.html`

- Similar al `index.html` original, pero Vite:
  - reemplaza el `<script>` por uno que apunta al JS compilado con hash
  - añade `<link rel="stylesheet">` al CSS compilado con hash

Ejemplo (hash cambia en cada build):

- `/assets/index-0h3dzHZ6.js`
- `/assets/index-z_s_b6Bm.css`

### `dist/assets/index-*.js`

Archivo: `animales/dist/assets/index-0h3dzHZ6.js`

Es JavaScript:

- **bundleado** (incluye el código de `src/main.ts` y `src/data.ts`)
- **minificado**
- con una parte inicial que ayuda a compatibilidad con `modulepreload`

### `dist/assets/index-*.css`

Archivo: `animales/dist/assets/index-z_s_b6Bm.css`

Es CSS:

- empaquetado y minificado a partir de `src/style.css`

### Por qué hay “hash” en nombres de assets

El hash permite **cache busting**:

- si cambias el código, cambia el nombre del asset
- el navegador descarga el nuevo sin quedarse con versiones viejas en caché

---

## Cómo correrlo

Desde `animales/`:

- **Dev**:

  - `npm install`
  - `npm run dev`

- **Build**:

  - `npm run build`
  - `npm run preview` (sirve el contenido de `dist/` para probarlo)
