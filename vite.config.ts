import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'
import * as fs from 'fs'

let releaseNotes = "Không có thông tin nội dung thay đổi phiên bản.";
try {
  releaseNotes = fs.readFileSync('CHANGELOG.md', 'utf-8');
} catch (e) {
  // Ignore
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_TIME__: JSON.stringify(new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })),
    __RELEASE_NOTES__: JSON.stringify(releaseNotes)
  },
  server: {
    port: 3000,
    strictPort: false,
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-popover', '@radix-ui/react-select', '@radix-ui/react-tabs', 'lucide-react', '@radix-ui/react-slot'],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'chart-vendor': ['recharts', 'chart.js', 'react-chartjs-2'],
        }
      }
    }
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
