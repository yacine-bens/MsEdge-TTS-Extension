import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const perBrowserManifest: Record<string, any> = {
  chrome: {
    permissions: [
      "storage",
      "contextMenus",
      "sidePanel",
    ],
    minimum_chrome_version: "116",
  },
  firefox: {
    permissions: [
      'storage',
    ]
  }
}

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [
      react(),
      nodePolyfills(),
    ],
    optimizeDeps: {
      include: ['@mui/icons-material'],
    }
  }),
  manifest: ({ browser }) => ({
    name: "MS Edge TTS (Text to Speech)",
    author: "https://github.com/yacine-bens",
    homepage_url: "https://github.com/yacine-bens/MsEdge-TTS-Extension.git",
    action: {
      "default_title": "MsEdge TTS"
    },
    ...perBrowserManifest[browser],
  })
});
