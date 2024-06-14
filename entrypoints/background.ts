import { storage } from "wxt/storage";
import Mellowtel from "mellowtel";
const CONFIGURATION_KEY = "YzQ3ODQ0Yjg=";

export default defineBackground({
  type: 'module',
  main: () => {
    if (import.meta.env.CHROME) chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(e => console.log(e));

    const mellowtel = new Mellowtel(atob(CONFIGURATION_KEY), {
      MAX_DAILY_RATE: 500,
    });

    const onInstalled = async () => {
      if (import.meta.env.CHROME) {
        const currentVersion = storage.defineItem<string>("local:currentVersion");
        const updateShown = storage.defineItem<boolean>("local:updateShown", { defaultValue: false });

        const newVersion = browser.runtime.getManifest().version;
        const currentVersionValue = await currentVersion.getValue();

        if (newVersion !== currentVersionValue) {
          await currentVersion.setValue(newVersion);

          const updateShownValue = await updateShown.getValue();
          if (!updateShownValue) {
            // @ts-expect-error
            await browser.tabs.create({ url: browser.runtime.getURL("/options.html") });
            await updateShown.setValue(true);
          }
        }

        // Dynamic content script gets cleared on update
        // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/ZM0Vzb_vuIs
        browser.scripting.unregisterContentScripts()
          .then(async () => {
            const permissions = await browser.permissions.getAll();

            if (permissions.origins?.includes("https://*/*")) {
              await browser.scripting.registerContentScripts([{
                id: "mellowtel-content",
                js: ["mellowtel-content.js"],
                matches: ["<all_urls>"],
                runAt: "document_start",
                allFrames: true,
              }]);
              const hasOptedIn = await mellowtel.getOptInStatus();
              if (hasOptedIn) {
                await mellowtel.start();
              }
            }
          });
      }

      chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
          "id": "edgetts",
          "title": "Speak with MS-Edge TTS",
          "contexts": ["selection"]
        });
      });
    };

    browser.runtime.onInstalled.addListener(onInstalled);
    browser.runtime.onStartup.addListener(onInstalled);

    if (import.meta.env.CHROME) {
      (async () => {
        await mellowtel.initBackground();

        const hasOptedIn = await mellowtel.getOptInStatus();
        if (hasOptedIn) {
          await mellowtel.start();
        }
      })();
    };

    browser.permissions.onAdded.addListener(async (permissions) => {
      if (!import.meta.env.CHROME) return;

      const scripts = await browser.scripting.getRegisteredContentScripts();
      const mellowtelContentScript = scripts.find((script) => script.id === "mellowtel-content");

      if (permissions.origins?.includes("https://*/*")) {
        if (!mellowtelContentScript) {
          await browser.scripting.registerContentScripts([{
            id: "mellowtel-content",
            js: ["mellowtel-content.js"],
            matches: ["<all_urls>"],
            runAt: "document_start",
            allFrames: true,
          }]);
        }
        const hasOptedIn = await mellowtel.getOptInStatus();
        if (hasOptedIn) {
          await mellowtel.start();
        }
      }
    });

    chrome.contextMenus.onClicked.addListener(async (clickData, tab) => {
      if (clickData.menuItemId != "edgetts" || !clickData.selectionText) return;

      const text = storage.defineItem<string>("session:text");
      text.setValue(clickData.selectionText);

      if (import.meta.env.CHROME) {
        chrome.sidePanel.open({ tabId: tab?.id! });
      }
      else if (import.meta.env.FIREFOX) {
        browser.browserAction.openPopup();
      }
    });
  }
});
