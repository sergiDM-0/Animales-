import PocketBase from "pocketbase"
import type { Animal, AnimalInput } from "./types"

const pb = new PocketBase(
  import.meta.env.VITE_POCKETBASE_URL ?? "http://127.0.0.1:8090",
)

type AnimalRecord = AnimalInput & {
  id: string
  collectionId?: string
  collectionName?: string
  created?: string
  updated?: string
}

function toAnimal(record: AnimalRecord): Animal {
  return {
    id: record.id,
    name: record.name,
    scientificName: record.scientificName,
    description: record.description,
    habitat: record.habitat,
    diet: record.diet,
    image: record.image,
    wikiUrl: record.wikiUrl,
    category: record.category,
  }
}

/** Comprueba que la API (PocketBase) responde antes de leer la base de datos. */
export async function checkApiConnection(): Promise<void> {
  await pb.health.check()
}

/**
 * Lee todos los animales desde la base de datos (SQLite vía PocketBase).
 * Flujo: sitio web → API REST → SQLite (backend/pb_data).
 */
export async function loadAnimals(): Promise<Animal[]> {
  await checkApiConnection()
  const records = await pb.collection("animals").getFullList<AnimalRecord>({
    sort: "name",
  })
  return records.map(toAnimal)
}

export function getApiBaseUrl(): string {
  return pb.baseUrl
}

export { pb }
