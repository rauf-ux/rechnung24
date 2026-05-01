import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Klarbill invoice generator — Vite config.
//
// The generator is bundled into a single self-contained module that the
// production `invoice-new.html` page mounts via:
//
//   <div id="generator-root"></div>
//   <script type="module" src="/generator/generator.js"></script>
//
// The bundle is written to <repo-root>/generator/ so Vercel serves it as a
// sibling of the static HTML pages.

export default defineConfig({
  plugins: [react()],
  base: '/generator/',
  build: {
    outDir: resolve(__dirname, '../../generator'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.tsx'),
      output: {
        entryFileNames: 'generator.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
