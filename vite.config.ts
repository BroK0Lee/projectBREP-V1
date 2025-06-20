import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Configuration Vite pour l'application
export default defineConfig({
  // Chemin de base de l'application
  base: '/',
  // Dossier public contenant Cascade Studio
  publicDir: 'public',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
