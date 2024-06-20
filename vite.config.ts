import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
      },
    }),

    sentryVitePlugin({
      org: 'karma-fixer',
      project: 'javascript-react',
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

  build: {
    sourcemap: true,
  },
});
