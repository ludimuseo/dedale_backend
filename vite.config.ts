import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  html: {},
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  plugins: [
    imagetools(),
    ViteImageOptimizer({
      ansiColors: true,
      logStats: true,
      cache: process.env.NODE_ENV === 'production',
      cacheLocation: 'cache',
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
    }),
    react(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      // Assets Alias
      { find: '@font', replacement: resolve(__dirname, 'src/assets/fonts') },
      { find: '@img', replacement: resolve(__dirname, 'src/assets/imgs') },
      { find: '@style', replacement: resolve(__dirname, 'src/assets/styles') },
      // App Alias
      {
        find: '@component',
        replacement: resolve(__dirname, 'src/app/components'),
      },
      {
        find: '@context',
        replacement: resolve(__dirname, 'src/app/contexts'),
      },
      {
        find: '@hook',
        replacement: resolve(__dirname, 'src/app/hooks'),
      },
      {
        find: '@service',
        replacement: resolve(__dirname, 'src/app/services'),
      },
    ],
  },
  build: {
    outDir: 'dist/client', // Définit le répertoire de sortie pour le build
    emptyOutDir: true, // Nettoie le répertoire de build avant chaque build
    rollupOptions: {
      input: './index.html', // Fichier d'entrée principal
    },
  },
})
