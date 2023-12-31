import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    port: 8080,
    proxy: {
      '/movies': {
        target: 'https://comforting-starlight-f3456a.netlify.app/.netlify/functions',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/movieCompanies': {
        target: 'https://comforting-starlight-f3456a.netlify.app/.netlify/functions',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/submitReview': {
        target: 'https://comforting-starlight-f3456a.netlify.app/.netlify/functions',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
