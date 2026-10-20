import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue() as never],
  resolve: {
    alias: [
      { find: '~/tailwind.config', replacement: resolve(__dirname, 'tailwind.config.ts') },
      { find: '~', replacement: resolve(__dirname, 'src') },
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/unit/**/*.test.ts'],
  },
})
