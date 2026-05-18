# Documentación del proyecto

Este proyecto es una “enciclopedia de animales” en **HTML + CSS + TypeScript** usando **Vite** como frontend y **[PocketBase](https://pocketbase.io)** (MIT, software libre) como API y base de datos (SQLite).

La carpeta `dist/` y sus `assets/` son **salida generada** por `vite build` (no se editan a mano).

---

## Inicio rápido (PocketBase + frontend)

### 1. Dependencias

```bash
npm install
cp .env.example .env
```

Edita `.env` y define `PB_ADMIN_EMAIL` y `PB_ADMIN_PASSWORD` (mínimo 8 caracteres).

### 2. Backend (terminal 1)

```bash
npm run pb:admin    # crea/actualiza el usuario admin (solo la primera vez)
npm run pb:serve      # API en http://127.0.0.1:8090 · panel en http://127.0.0.1:8090/_/
```

En otra terminal, con PocketBase en marcha:

```bash
npm run seed        # importa los animales de src/data.ts a la base de datos
```

### 3. Frontend (terminal 2)

```bash
npm run dev         # http://localhost:5173
```

La interfaz (grid, filtros, diálogo) es la misma; los datos vienen de la API.

### Flujo de datos (almacenar → traer → mostrar)

```
npm run seed  →  guarda animales en SQLite (backend/pb_data)
                      ↑
npm run pb:serve  →  PocketBase expone API REST (:8090)
                      ↑
npm run dev  →  el sitio llama loadAnimals() y pinta el grid
```

1. **Almacenar:** `npm run seed` (o el panel http://127.0.0.1:8090/_/) escribe en la base de datos.
2. **Traer:** `src/api.ts` pide `GET /api/collections/animals/records` a PocketBase.
3. **Mostrar:** `src/main.ts` renderiza tarjetas y el diálogo con esos datos.

En la cabecera del sitio verás cuántos animales se cargaron desde la base de datos y un botón **Actualizar** para volver a leer la API.

### Añadir muchos animales por API

Con PocketBase en marcha:

```bash
npm run import:animals          # catálogo base + extra (~64 en total)
npm run import:animals:extra    # solo src/animals-extra.json
npm run import:animals:wikipedia  # fichas desde Wikipedia (wiki-import-list.json)
```

Edita `src/animals-extra.json` o `src/wiki-import-list.json` y vuelve a ejecutar; no se duplican registros (mismo nombre científico).

### Validación antes de guardar

Antes de insertar en la base de datos, `scripts/validate-animal.ts` comprueba:

- Que la **descripción** hable del animal (nombre o género científico).
- Que la **imagen** exista, sea realmente una imagen y no un placeholder.
- Que la imagen **no sea genérica** (misma URL en varios animales, Unsplash/Pexels sin relación con el nombre).
- Coherencia con el **resumen de Wikipedia** (si hay `wikiUrl`).

```bash
npm run validate:animals:extra    # revisar sin guardar
npm run import:animals:extra      # valida y luego guarda (rechaza los incorrectos)
npm run import:animals:extra -- --fix   # sustituye imagen por la de Wikipedia si falla
npm run import:animals:extra -- --skip-validation   # omitir validación
```

### Scripts útiles

| Comando | Descripción |
|---------|-------------|
| `npm run pb:download` | Descarga el binario de PocketBase en `backend/` |
| `npm run pb:serve` | Arranca PocketBase (aplica migraciones en `backend/pb_migrations/`) |
| `npm run pb:admin` | Crea admin desde `.env` |
| `npm run seed` | Puebla la colección `animals` (solo si está vacía) |
| `npm run import:animals` | Importa catálogo base + extra vía API (omite duplicados) |
| `npm run import:animals:extra` | Solo los animales nuevos de `src/animals-extra.json` |
| `npm run import:animals:wikipedia` | Descarga fichas de Wikipedia y las guarda en la BD |
| `npm run validate:animals:extra` | Revisa el catálogo sin guardar (imagen + contenido) |
| `npm run dev` | Frontend Vite |
| `npm run build` | Build de producción del frontend |

### Estructura backend

- **`backend/pocketbase`**: ejecutable (no versionado; se descarga con `pb:download`).
- **`backend/pb_migrations/`**: esquema de la colección `animals`.
- **`backend/pb_data/`**: SQLite y datos (gitignored).
- **`src/api.ts`**: cliente PocketBase en el frontend.
- **`src/data.ts`**: datos iniciales solo para el seed.

Variable de entorno del frontend: `VITE_POCKETBASE_URL` (por defecto `http://127.0.0.1:8090` en `.env.development`).

---

## Estructura

- **`index.html`**: HTML base (punto de entrada de la app en desarrollo).
- **`src/`**: código fuente (TypeScript, CSS, datos).
  - **`src/main.ts`**: lógica de UI (render, filtros, diálogo).
  - **`src/api.ts`**: carga de animales desde PocketBase.
  - **`src/types.ts`**: tipos TypeScript (`Animal`).
  - **`src/data.ts`**: datos iniciales para el script `seed`.
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

## `src/types.ts` y `src/data.ts`

- **`src/types.ts`**: interfaz `Animal` y tipo `AnimalCategory`.
- **`src/data.ts`**: array `animals` (sin `id`) usado solo por `npm run seed` para poblar PocketBase.

### Detalles importantes

- El campo **`category`** es un *union type* en `types.ts`.
- En runtime, `src/main.ts` carga los animales con `loadAnimals()` desde `src/api.ts` (PocketBase).

---

## `src/main.ts` (lógica de la app)

Archivo: `animales/src/main.ts`

### Responsabilidad general

- Carga `animals` desde PocketBase al iniciar (`loadAnimals()`).
- Construye las categorías disponibles a partir de los datos cargados.
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

- **bundleado** (incluye el código de `src/main.ts`, `src/api.ts`, etc.; ya no incluye el array estático de animales)
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
