import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Klarbill app — Vite-React SPA at klarbill.de/app/*
//
// Production build emits to <repo-root>/app/, served by Vercel under /app/*
// via a rewrite rule (vercel.json) so React Router handles client-side routing.
//
// In dev (`npm run dev`), Vite serves the SPA from localhost:5173/ with
// base = / for the cleanest dev experience. In prod, base = /app/ so all
// asset URLs resolve correctly under that path.

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/app/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../../app'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/main-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
}));
