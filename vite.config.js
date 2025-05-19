import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/acervo/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    server: {
      historyApiFallback: true, // This will handle route fallbacks for history mode
    }
  },
})
