import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

const isStorybook = process.argv[1]?.includes('storybook')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Storybook과 vite-plugin-vue-devtools 호환성 문제로 조건부 로드
    !isStorybook && vueDevTools(),
    svgLoader(),
  ].filter(Boolean),
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "${fileURLToPath(new URL('./src/krds/styles/common/_variables_for_code.scss', import.meta.url))}" as *;
          @use "${fileURLToPath(new URL('./src/krds/styles/common/_group_mixins.scss', import.meta.url))}" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
