import { createWriteStream } from "node:fs"
import { chmod, mkdir, stat } from "node:fs/promises"
import { pipeline } from "node:stream/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendDir = path.resolve(__dirname, "../backend")
const pbVersion = "0.25.8"

const assets = {
  "darwin-arm64": {
    url: `https://github.com/pocketbase/pocketbase/releases/download/v${pbVersion}/pocketbase_${pbVersion}_darwin_arm64.zip`,
    binary: "pocketbase",
  },
  "darwin-x64": {
    url: `https://github.com/pocketbase/pocketbase/releases/download/v${pbVersion}/pocketbase_${pbVersion}_darwin_amd64.zip`,
    binary: "pocketbase",
  },
  "linux-x64": {
    url: `https://github.com/pocketbase/pocketbase/releases/download/v${pbVersion}/pocketbase_${pbVersion}_linux_amd64.zip`,
    binary: "pocketbase",
  },
  "win32-x64": {
    url: `https://github.com/pocketbase/pocketbase/releases/download/v${pbVersion}/pocketbase_${pbVersion}_windows_amd64.zip`,
    binary: "pocketbase.exe",
  },
}

function platformKey() {
  const { platform, arch } = process
  if (platform === "darwin" && arch === "arm64") return "darwin-arm64"
  if (platform === "darwin") return "darwin-x64"
  if (platform === "linux" && arch === "x64") return "linux-x64"
  if (platform === "win32" && arch === "x64") return "win32-x64"
  throw new Error(`Plataforma no soportada: ${platform} ${arch}`)
}

async function exists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

async function main() {
  const key = platformKey()
  const { url, binary } = assets[key]
  const target = path.join(backendDir, binary)

  await mkdir(backendDir, { recursive: true })

  if (await exists(target)) {
    console.log(`PocketBase ya existe: ${target}`)
    return
  }

  console.log(`Descargando PocketBase ${pbVersion} (${key})…`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Descarga fallida: ${res.status} ${res.statusText}`)

  const zipPath = path.join(backendDir, "pocketbase.zip")
  await pipeline(res.body, createWriteStream(zipPath))

  const { execSync } = await import("node:child_process")
  execSync(`unzip -o "${zipPath}" -d "${backendDir}"`, { stdio: "inherit" })
  if (process.platform !== "win32") {
    await chmod(target, 0o755)
  }

  console.log(`Listo: ${target}`)
  console.log("Arranca con: npm run pb:serve")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
