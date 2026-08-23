import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@carnica': fileURLToPath(new URL('../../src/carnica', import.meta.url)),
      '@showcase': fileURLToPath(new URL('./src', import.meta.url)),
      react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(
        new URL('./node_modules/react-dom', import.meta.url),
      ),
      'motion/react': fileURLToPath(
        new URL('./node_modules/motion/react', import.meta.url),
      ),
      motion: fileURLToPath(new URL('./node_modules/motion', import.meta.url)),
    },
    dedupe: ['react', 'react-dom', 'motion'],
  },
  build: {
    outDir: 'dist-legacy',
    rollupOptions: {
      input: fileURLToPath(new URL('./legacy.html', import.meta.url)),
    },
  },
});
