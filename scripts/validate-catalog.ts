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

function loadExtraCatalog(): AnimalInput[] {
  const file = path.join(__dirname, "../src/animals-extra.json")
  return JSON.parse(readFileSync(file, "utf-8")) as AnimalInput[]
}

async function main(): Promise<void> {
  const extraOnly = process.argv.includes("--extra-only")
  const strict = process.argv.includes("--strict")
  const catalog = extraOnly ? loadExtraCatalog() : [...baseAnimals, ...loadExtraCatalog()]

  const dupUrls = new Set(findDuplicateImageUrls(catalog).keys())
  if (dupUrls.size > 0) {
    console.log("URLs de imagen repetidas en el catálogo:\n")
    for (const [url, names] of findDuplicateImageUrls(catalog)) {
      console.log(`  ${url}`)
      console.log(`    → ${names.join(", ")}\n`)
    }
  }

  console.log(`Validando ${catalog.length} animales (sin guardar en BD)…\n`)

  let passed = 0
  let failed = 0

  for (const animal of catalog) {
    const result = await validateAnimal(animal, {
      strict,
      usedImageUrls: dupUrls,
    })
    printValidationResult(animal, result)
    if (result.ok) passed++
    else failed++
    await new Promise((r) => setTimeout(r, 80))
  }

  console.log(`\nResumen: ${passed} válidos, ${failed} rechazados.`)
  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
