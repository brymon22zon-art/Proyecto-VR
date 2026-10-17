import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          introduccion: path.resolve(__dirname, 'pages/introduccion.html'),
          objetivos: path.resolve(__dirname, 'pages/objetivos.html'),
          problema: path.resolve(__dirname, 'pages/problema.html'),
          justificacion: path.resolve(__dirname, 'pages/justificacion.html'),
          metodologia: path.resolve(__dirname, 'pages/metodologia.html'),
          resultados: path.resolve(__dirname, 'pages/resultados.html'),
          simulador: path.resolve(__dirname, 'pages/simulador.html'),
          conclusiones: path.resolve(__dirname, 'pages/conclusiones.html'),
          bibliografia: path.resolve(__dirname, 'pages/bibliografia.html'),
          anexos: path.resolve(__dirname, 'pages/anexos.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
