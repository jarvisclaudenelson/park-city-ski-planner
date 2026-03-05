import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['trail-map.jpg', 'icons/*.svg'],
      manifest: {
        name: 'Park City Mountain Day Planner',
        short_name: 'PC Ski Planner',
        description: 'Plan your ski day at Park City Mountain Resort. Route your perfect day on 349 trails and 44 lifts.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
          { src: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB — trail-map.jpg is ~3MB
        globPatterns: ['**/*.{js,css,html,jpg,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:jpg|png)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 10, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  root: '.',
  server: {
    port: 3000,
  },
});
