import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import carnicaPreset from '../../src/carnica/styles/tailwind-preset.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  // Каноничная палитра/типографика/keyframes живут в Carnica DS.
  // Здесь только content-пути и project-specific расширения, если нужны.
  presets: [carnicaPreset],
  content: [
    resolve(__dirname, 'index.html'),
    resolve(__dirname, 'src/**/*.{ts,tsx}'),
    // canonical Carnica DS — компоненты Димы тоже сканируем,
    // иначе их классы (bg-bee-*, h-14, rounded-pill и т.п.)
    // не попадают в финальный CSS-бандл.
    resolve(__dirname, '../../src/carnica/**/*.{ts,tsx}'),
  ],
};
