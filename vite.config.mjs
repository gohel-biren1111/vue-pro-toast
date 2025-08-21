import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: [
      "localhost",
      // add other domains you want to allow here
    ],
    hmr: false,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
