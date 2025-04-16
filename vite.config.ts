
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ['409affc5-4d9e-4813-902f-263aa3985e80.lovableproject.com'],
    fs: {
      // Allow serving files from one level up from the package root
      allow: [".."],
    },
    // Add CORS headers for Craft CMS integration
    cors: true,
  },
  plugins: [
    react(),
    // Removed componentTagger which was not defined
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    // Add manifest for Craft CMS to reference built assets
    manifest: true,
    rollupOptions: {
      // Ensure external dependencies are correctly handled
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      }
    }
  },
}));
