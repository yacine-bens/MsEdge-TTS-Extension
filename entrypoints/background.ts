export default defineBackground({
  type: 'module',
  main: () => {
    if (import.meta.env.CHROME) chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(e => console.log(e));

    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        "id": "edgetts",
        "title": "Speak with MS-Edge TTS",
        "contexts": ["selection"]
      });
    });

    chrome.contextMenus.onClicked.addListener(async (clickData, tab) => {
      if (clickData.menuItemId != "edgetts" || !clickData.selectionText) return;

      if (import.meta.env.CHROME) {
        chrome.storage.session.set({ text: clickData.selectionText });
        chrome.sidePanel.open({ tabId: tab?.id! });
      }
      else if (import.meta.env.FIREFOX) {
        browser.storage.session.set({ text: clickData.selectionText });
        browser.browserAction.openPopup();
      }
    });
  }
});
