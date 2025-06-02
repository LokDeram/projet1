import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'service-worker.js',
      includeAssets: ['favicon.ico', 'icon-192.png', 'favicon-96x96.png'],
      manifest: {
        name: 'Avis et alertes',
        short_name: 'Alertes',
        description: 'Recevez les alertes de la Ville de Montréal',
        start_url: '/',
        scope: '/',
        theme_color: '#003366',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
