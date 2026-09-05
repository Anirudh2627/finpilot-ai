import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: [
      '.vercel.run',
      '.e2b.dev',
      '.e2b.app',
      'localhost',
      '127.0.0.1'
    ],
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    },
  }
})