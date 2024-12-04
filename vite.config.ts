import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      // '@leather.io/ui': path.resolve('./node_modules/@leather.io/ui'),
      'leather-styles': path.resolve('./leather-styles'),
      'leather-styles/*': path.resolve('./leather-styles/*'),
    },
  },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       'leather-styles/css',
  //       'leather-styles/jsx',
  //       'leather-styles/patterns',
  //       'leather-styles/recipes',
  //       'leather-styles/tokens',
  //       'leather-styles/types',
  //     ],
  //   },
  // },
});
