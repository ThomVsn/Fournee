import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Pour GitHub Pages : adapter "base" au nom exact du dépôt GitHub
export default defineConfig({
  plugins: [react()],
  base: '/Fournee/',
})
