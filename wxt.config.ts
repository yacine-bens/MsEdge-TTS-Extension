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
    name: "MS Edge TTS (Text to Speech)",
    action: {
      "default_title": "MsEdge TTS"
    },
    permissions: [
      "sidePanel",
      "storage",
      "contextMenus"
    ]
  }
});
