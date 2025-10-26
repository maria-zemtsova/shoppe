/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [Vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setup.ts'],
    alias: {
      '#components': path.resolve(__dirname, '.nuxt/components'),
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './'),
    },
  },
})
