import { execSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendDir = path.resolve(__dirname, "../backend")
const binary = process.platform === "win32" ? "pocketbase.exe" : "pocketbase"

const email = process.env.PB_ADMIN_EMAIL
const password = process.env.PB_ADMIN_PASSWORD

if (!email || !password) {
  console.error("Define PB_ADMIN_EMAIL y PB_ADMIN_PASSWORD en .env")
  process.exit(1)
}

execSync(`"${path.join(backendDir, binary)}" superuser upsert "${email}" "${password}"`, {
  cwd: backendDir,
  stdio: "inherit",
})

console.log(`Admin listo: ${email}`)
