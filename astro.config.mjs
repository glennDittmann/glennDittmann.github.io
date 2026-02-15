// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Map .vite/deps WASM filenames to actual package paths (Vite pre-bundles by name) */
/** @type {Record<string, string>} */
const WASM_DEPS_MAP = {
  rita_bg: "node_modules/@lempf/rita/rita_bg.wasm",
  vertex_clustering_bg: "node_modules/vertex_clustering/vertex_clustering_bg.wasm",
};

/** Serve .wasm from node_modules with correct MIME type (Vite may serve with wrong type) */
function wasmMimeType() {
  return {
    name: "wasm-mime-type",
    configureServer(server) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (!url.endsWith(".wasm")) {
          next();
          return;
        }
        // Resolve from project root (e.g. /node_modules/vertex_clustering/vertex_clustering_bg.wasm)
        let filePath = path.join(__dirname, url.replace(/^\//, ""));
        if (!fs.existsSync(filePath) && url.includes(".vite/deps/")) {
          const base = path.basename(url, ".wasm");
          const mapped = WASM_DEPS_MAP[base];
          if (mapped) {
            const fallback = path.join(__dirname, mapped);
            if (fs.existsSync(fallback)) filePath = fallback;
          }
        }
        if (!fs.existsSync(filePath)) {
          next();
          return;
        }
        res.setHeader("Content-Type", "application/wasm");
        fs.createReadStream(filePath).pipe(res);
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), wasmMimeType()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
