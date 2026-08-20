import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  // Vitest lee esta misma config de Vite (mismo plugin de React, mismos
  // alias) en vez de necesitar un archivo de config aparte. jsdom simula un
  // DOM de navegador en Node, necesario para las pruebas de componentes con
  // React Testing Library (no solo para las de utils, que son funciones puras).
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    globals: true
  }
});
