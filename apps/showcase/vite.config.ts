import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@carnica': fileURLToPath(new URL('../../src/carnica', import.meta.url)),
      '@showcase': fileURLToPath(new URL('./src', import.meta.url)),
      react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)),
      // motion/react импортируется из carnica/components/Segment* —
      // эти файлы живут вне apps/showcase, поэтому Node-resolution их node_modules не находит.
      'motion/react': fileURLToPath(new URL('./node_modules/motion/react', import.meta.url)),
      motion: fileURLToPath(new URL('./node_modules/motion', import.meta.url)),
    },
    dedupe: ['react', 'react-dom', 'motion'],
  },
});
