import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// The defineConfig function provides type checking for our Vite configuration
export default defineConfig({
  // Plugins extend Vite's functionality
  plugins: [react()],

  // The resolve configuration tells Vite how to find and process modules
  resolve: {
    // Aliases help simplify import paths in our code
    alias: {
      // This matches our TypeScript path configuration
      // path.resolve helps create an absolute path, which is more reliable
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Server configuration for development
  server: {
    // Automatically open the browser when starting development server
    open: true,
    // Exit process if port is already in use
    strictPort: false,
    // Enable HMR (Hot Module Replacement) for faster development
    hmr: true,
  },
});
