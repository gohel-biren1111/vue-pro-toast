import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5002,
    host: '0.0.0.0',
    allowedHosts: 'all',
    hmr: {
      clientPort: 443,
      host: 'localhost'
    },
    origin: 'http://localhost:5002'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})