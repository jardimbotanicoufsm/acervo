import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  base: '/acervo/',
  plugins: [
    vue(),
    vueDevTools(),
    imagetools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },    server: {
      historyApiFallback: true, // This will handle route fallbacks for history mode
    }
  },
})
