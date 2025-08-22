import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: ["localhost"],
    hmr: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VueProToast",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // externalize dependencies (vue ko bundle me mat daalna)
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
