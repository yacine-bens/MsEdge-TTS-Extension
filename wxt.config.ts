import { defineConfig, UserManifest } from 'wxt';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const perBrowserManifest: Record<string, Record<number, UserManifest>> = {
  chrome: {
    3: {
      version: "1.2.10",
      permissions: [
        "storage",
        "contextMenus",
        "sidePanel",
        "scripting",
        "activeTab",
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
  },
  firefox: {
    2: {
      version: "1.2.10",
      permissions: [
        "storage",
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
    },
  }
};

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [
      nodePolyfills() as any,
    ],
    optimizeDeps: {
      include: ['@mui/icons-material', '@emotion/styled', '@emotion/react', '@mui/material'],
    }
  }),
  manifest: ({ browser, manifestVersion }) => ({
    name: "MS Edge TTS (Text to Speech)",
    author: "https://github.com/yacine-bens",
    homepage_url: "https://github.com/yacine-bens/MsEdge-TTS-Extension.git",
    action: {
      "default_title": "MsEdge TTS"
    },
    ...perBrowserManifest[browser][manifestVersion],
  })
});
