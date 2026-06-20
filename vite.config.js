import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://gemini-liza.ru' // Твой домен на сервере
    }
  }
})
