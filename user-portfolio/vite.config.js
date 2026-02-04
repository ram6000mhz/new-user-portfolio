import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact({prerender:true,}),tailwindcss(),],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  build: {
    assetsInlineLimit: 16000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-bundle': ['three'],
          'motion-bundle': ['motion'],
          'ui-bundle': ['react-rnd', 'lucide-preact', 'zustand'],
        },
      },
    },
  },
})
