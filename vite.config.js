import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.'
        },
        {
          src: 'public/rules.json',
          dest: '.'
        },
        {
          src: 'public/icons/*',
          dest: 'icons'
        }
      ]
    }),
    // Custom plugin to ensure HTML files are at root with correct names
    {
      name: 'move-html-to-root',
      generateBundle(options, bundle) {
        Object.keys(bundle).forEach(fileName => {
          if (fileName.includes('/') && fileName.endsWith('.html')) {
            // For popup.html and options.html, use specific names
            let newFileName;
            if (fileName.includes('popup')) {
              newFileName = 'popup.html';
            } else if (fileName.includes('options')) {
              newFileName = 'options.html';
            } else {
              newFileName = fileName.split('/').pop();
            }
            bundle[newFileName] = bundle[fileName];
            delete bundle[fileName];
          }
        });
      }
    }
  ],
  server: {
    open: '/src/pages/options/index.html'
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/pages/popup/index.html'),
        options: resolve(__dirname, 'src/pages/options/index.html'),
        background: resolve(__dirname, 'src/background/background.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') {
            return 'background.js'
          }
          return 'assets/[name]-[hash].js'
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@hooks': resolve(__dirname, 'src/hooks')
    }
  }
})
