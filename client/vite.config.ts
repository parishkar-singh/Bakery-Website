import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

export default defineConfig(async () => ({
  build: {
    outDir: 'dist', // Output directory
    assetsDir: 'assets', // Directory for static assets
    rollupOptions: {
      output: {
        entryFileNames: 'script.js', // Use the original name for entry files
        chunkFileNames: 'index.js', // Use the original name for chunk files
        assetFileNames: '[name].[ext]' // Use the original name for asset files (e.g., CSS)
      }
    }
  },
  plugins: [react()],
  clearScreen: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
  preview: {
    port: 3000,
  },
}));
