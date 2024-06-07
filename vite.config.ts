import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import istanbul from 'vite-plugin-istanbul';
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
      },
    }),
    istanbul({
      include: ['src/**/*'], // files to track coverage on
      exclude: ['node_modules'], // files to NOT track coverage on
      requireEnv: false,
    }),
  ],
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
  resolve: {
    alias: {
      app: resolve(__dirname, 'src/app'),
      pages: resolve(__dirname, 'src/pages'),
      shared: resolve(__dirname, 'src/shared'),
      widgets: resolve(__dirname, 'src/widgets'),
      features: resolve(__dirname, 'src/features'),
      entities: resolve(__dirname, 'src/entities'),
      images: resolve(__dirname, 'src/shared/assets/images'),
      icons: resolve(__dirname, 'src/shared/assets/icons'),
      breakpoints: resolve(__dirname, 'src/app/styles/breakpoints.scss'),
    },
  },
});
