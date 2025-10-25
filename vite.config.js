import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei']
        }
      }
    }
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.obj'],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '/src/assets': '/assets' // 👈 Maps your old asset paths to the new public/assets folder
    }
  }
});
