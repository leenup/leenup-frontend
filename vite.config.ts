import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { port: 5173, open: true },
  build: { 
    outDir: 'build',
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (!name) return 'assets/[name]-[hash][extname]'

          if (name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        },
      },
    }, 
  }
})