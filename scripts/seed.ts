import PocketBase from "pocketbase"
import { animals } from "../src/data"

const PB_URL = process.env.PB_URL ?? "http://127.0.0.1:8090"
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD

async function main() {
  if (!PB_ADMIN_EMAIL || !PB_ADMIN_PASSWORD) {
    console.error(
      "Define PB_ADMIN_EMAIL y PB_ADMIN_PASSWORD en .env (credenciales del admin de PocketBase).",
    )
    process.exit(1)
  }

  const pb = new PocketBase(PB_URL)

  try {
    await pb.health.check()
  } catch {
    console.error(`PocketBase no responde en ${PB_URL}. Ejecuta: npm run pb:serve`)
    process.exit(1)
  }

  await pb.collection("_superusers").authWithPassword(PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD)

  const existing = await pb.collection("animals").getList(1, 1)
  if (existing.totalItems > 0) {
    console.log(`Ya hay ${existing.totalItems} registro(s). Omitiendo seed.`)
    return
  }

  let created = 0
  for (const animal of animals) {
    await pb.collection("animals").create(animal)
    created++
  }

  console.log(`Seed completado: ${created} animales creados.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
