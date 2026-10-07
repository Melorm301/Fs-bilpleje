import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Base-stien styrer, hvor hjemmesiden kan ligge.
 * På GitHub Pages er det typisk "/fs-bilpleje/". Sæt VITE_BASE_PATH=/ når
 * hjemmesiden flyttes til et eget domæne i roden.
 */
const base = process.env.VITE_BASE_PATH ?? "/fs-bilpleje/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
  },
});
