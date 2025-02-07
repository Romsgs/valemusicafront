import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Certifique-se de que a base está correta
  build: {
    outDir: "dist",
  },
});
