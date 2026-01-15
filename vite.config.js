import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/ade-portfolio/",
  publicDir: "public", // Memastikan semua file di public/ ter-copy ke dist/
});
