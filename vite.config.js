import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: {
    port: 8000,
  },
  preview: {
    port: 8000,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        assetFileNames: "index.css",
        dir: "./dist",
      },
    },
  },
});
