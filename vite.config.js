import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5002,
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      '.replit.dev',
      'aba4f415-ed27-4a8c-b80d-d05241f197bb-00-3cv2hgm5z25yk.riker.replit.dev'
    ],
    hmr: false
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})