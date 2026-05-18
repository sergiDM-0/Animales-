# Enciclopedia de Animales

Este proyecto es una enciclopedia interactiva de animales que integra un frontend moderno con una base de datos backend autónoma y herramientas de automatización para la gestión de contenido.

## 🚀 Stack Tecnológico

- **Frontend**: Vite + TypeScript (Vanilla CSS para un rendimiento ligero).
- **Backend**: PocketBase (SQLite + API REST integrada).
- **Automatización**: Node.js con `tsx` para el procesamiento y validación de datos.
- **Fuentes de Datos**: API REST de Wikipedia, catálogos locales JSON.

## 📂 Estructura del Proyecto

```text
├── backend/            # Almacena los datos y el binario de PocketBase (pb_data)
├── scripts/            # Motor de automatización:
│   ├── import-animals.ts      # Importa datos desde archivos JSON o Wikipedia.
│   ├── validate-animal.ts     # Lógica de validación (calidad de imagen, coherencia de texto).
│   ├── seed.ts                # Puebla la base de datos inicial.
│   └── serve-pb.mjs           # Gestiona el ciclo de vida de PocketBase.
├── src/                # Frontend:
│   ├── api.ts                 # Cliente de conexión con PocketBase.
│   ├── data.ts                # Catálogo base (hardcoded).
│   ├── animals-extra.json     # Catálogo extendido manual.
│   └── wiki-import-list.json  # Lista de títulos para búsqueda en Wikipedia.
└── package.json        # Scripts de gestión.
```

## ⚙️ Funcionamiento y Flujo de Trabajo

### 1. Inicialización
Para preparar el entorno local:
```bash
npm install
npm run pb:admin     # Configura el usuario administrador desde tu .env
```

### 2. Alimentación de Datos (Data Pipeline)
El sistema permite tres formas de alimentar la enciclopedia:
*   **Catálogo Base**: Ejecuta `npm run seed` para cargar `src/data.ts` y `src/animals-extra.json`.
*   **Importación Masiva de Wikipedia**: Ejecuta `npm run import:animals:wikipedia`. El script lee `src/wiki-import-list.json`, consulta la API de Wikipedia, valida la calidad de la información (mediante `validate-animal.ts`) e inserta el animal si es coherente.
*   **Validación**: Ejecuta `npm run validate:animals` para detectar imágenes rotas, duplicadas o descripciones inconsistentes antes de importar.

### 3. Desarrollo
Para trabajar con el proyecto:
1.  **Backend**: `npm run pb:serve` (mantiene la API activa).
2.  **Frontend**: `npm run dev` (inicia el servidor de desarrollo Vite).

## 🛠️ Administración de la Base de Datos
Tienes dos formas de gestionar tus registros:
1.  **Interfaz Web**: Accede a `http://127.0.0.1:8090/_/` para ver las tablas, editar animales manualmente o gestionar usuarios.
2.  **Acceso SQLite**: El archivo se encuentra en `backend/pb_data/data.db`. Puedes abrirlo con DBeaver para consultas SQL directas (asegúrate de cerrar PocketBase antes).

## 💡 Cómo añadir nuevos animales
1.  Abre `src/wiki-import-list.json`.
2.  Añade el título del animal (nombre tal cual aparece en Wikipedia es).
3.  Ejecuta `npm run import:animals:wikipedia`.
4.  El sistema validará automáticamente la imagen y los datos antes de guardarlos.

---
*Este proyecto está diseñado para ser escalable y modular, permitiendo añadir miles de especies manteniendo la integridad de los datos mediante el validador automático.*
