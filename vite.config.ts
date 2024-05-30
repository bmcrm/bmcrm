import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'app': resolve(__dirname, 'src/app'),
      'pages': resolve(__dirname, 'src/pages'),
      'shared': resolve(__dirname, 'src/shared'),
      'widgets': resolve(__dirname, 'src/widgets'),
    },
  },
});
