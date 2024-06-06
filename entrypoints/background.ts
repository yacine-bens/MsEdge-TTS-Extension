import { storage } from "wxt/storage";

export default defineBackground({
  type: 'module',
  main: () => {
    // if (import.meta.env.CHROME) chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(e => console.log(e));

    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        "id": "edgetts",
        "title": "Speak with MS-Edge TTS",
        "contexts": ["selection"]
      });
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
