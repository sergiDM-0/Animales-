import { defineConfig } from "vite"

export default defineConfig({
  root: ".",
  server: {
    proxy: {
      "/pb": {
        target: "http://127.0.0.1:8090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pb/, ""),
      },
    },
  },
})
