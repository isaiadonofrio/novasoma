import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.jpg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,jpg,webp,png,svg}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      manifest: {
        name: 'Nova Soma — Biomechanics & Strength',
        short_name: 'Nova Soma',
        description: '100% local-first workout planner and 127-movement biomechanics library.',
        theme_color: '#F7F4F0',
        background_color: '#F7F4F0',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            },
            {
              name: 'icons-vendor',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            },
            {
              name: 'exercise-data',
              test: /[\\/]src[\\/]data[\\/](exerciseDatabase|exerciseMedia|exerciseTaxonomy|exerciseConstants|exercises[\\/]).*\.js$/,
            },
          ],
        },
      },
    },
  },
});
