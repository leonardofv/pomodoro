import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // Babel em vez de SWC

export default defineConfig({
  plugins: [
    react(), // agora enums passam sem erro
  ],
})
