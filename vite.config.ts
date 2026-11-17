import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // "/" on the salon's own domain; the GitHub Pages workflow sets
  // BASE_PATH=/Salon-Lauren-website-demo/ because Pages serves from a subfolder.
  base: process.env.BASE_PATH || '/',
  build: {
    // Photos live in public/img and are served as-is (see scripts/images.mjs).
    target: 'es2020',
  },
});
