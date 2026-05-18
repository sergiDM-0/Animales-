import { spawn } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendDir = path.resolve(__dirname, "../backend")
const binary = process.platform === "win32" ? "pocketbase.exe" : "pocketbase"

const child = spawn(path.join(backendDir, binary), ["serve"], {
  cwd: backendDir,
  stdio: "inherit",
})

child.on("exit", (code) => process.exit(code ?? 0))
