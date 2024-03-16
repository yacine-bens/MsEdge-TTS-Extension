import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [
      react(),
      nodePolyfills(),
    ],
  }),
  manifest: {
    action: {
      "default_title": "msedge-tts"
    },
    permissions: [
      "sidePanel",
      "storage",
      "contextMenus"
    ]
  }
});
