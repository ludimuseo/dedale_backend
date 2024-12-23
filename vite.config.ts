import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
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
  plugins: [react()],
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
})
