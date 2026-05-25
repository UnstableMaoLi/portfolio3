import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/portfolio3/",
  plugins: [vue()],
  build: {
    outDir: "dist/pr9",
    emptyOutDir: true
  }
});
