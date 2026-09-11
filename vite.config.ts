import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      // Restrict file system access to the project root + node_modules.
      // The `skills/`, `upload/`, `download/` folders are not part of the
      // Vite project and should not be scanned for imports.
      allow: ['.', 'node_modules'],
    },
    watch: {
      ignored: ['**/skills/**', '**/upload/**', '**/download/**', '**/.git/**'],
    },
  },
  optimizeDeps: {
    // Only scan the project's own index.html and src files for dependencies.
    // Without this, Vite would crawl every HTML file in the project (including
    // the skill templates under /skills) and try to resolve their deps.
    entries: ['index.html', 'src/main.tsx'],
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
        },
      },
    },
  },
})
