import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/vite-react-pglite/',
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
  plugins: [react()],
  worker: {
    format: 'es',
  },
})
