import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const perBrowserManifest: Record<string, any> = {
  chrome: {
    permissions: [
      "storage",
      "contextMenus",
      "sidePanel",
      "scripting",
      "activeTab",
    ],
    optional_permissions: [
      "tabs",
      "declarativeNetRequestWithHostAccess",
    ],
    optional_host_permissions: [
      "https://*/*",
    ],
    commands: {
      "speak-selection": {
        suggested_key: {
          default: "Ctrl+Shift+S",
          mac: "Command+Shift+S"
        },
        description: "Speak selected text"
      }
    },
    minimum_chrome_version: "116",
  },
  firefox: {
    permissions: [
      'storage',
      "contextMenus",
      "scripting",
      "activeTab",
    ],
    commands: {
      "speak-selection": {
        suggested_key: {
          // for firefox, Ctrl+Shift+S is already used for "screenshots"
          default: "Ctrl+Shift+F",
          mac: "Command+Shift+F"
        },
        description: "Speak selected text"
      }
    },
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
      include: ['@mui/icons-material', '@emotion/styled', '@emotion/react', '@mui/material'],
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
