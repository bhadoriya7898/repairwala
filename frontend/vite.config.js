import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),  // <-- FIX
      '@': path.resolve(__dirname, './src'),  // optional but recommended
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
