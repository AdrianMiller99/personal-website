import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment this line when deploying to GitHub Pages if not using a custom domain
  // base: '/personal-website/',
  // When using HashRouter and a custom domain, we can leave base as '/'
  base: '/',
  optimizeDeps: {
    include: ['react-pdf'],
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})
