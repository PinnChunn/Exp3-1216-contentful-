import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      origin: [
        'https://stackblitz.io',
        'https://stackblitz.com',
        'https://bolt.new',
        'https://exp32024.web.app',
        'https://exp32024.firebaseapp.com',
        'https://exp3.org',
        'https://netlify.app',
        'http://localhost:5173',
        'https://webcontainer.io'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }
  },
  define: {
    'process.env': process.env
  }
});