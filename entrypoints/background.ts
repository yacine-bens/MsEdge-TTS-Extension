export default defineBackground({
  type: 'module',
  include: ['chrome'],
  main: () => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(e => console.log(e));

    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        "id": "edgetts",
        "title": "Speak with MS-Edge TTS",
        "contexts": ["selection"]
      });
    });

    chrome.contextMenus.onClicked.addListener(async (clickData, tab) => {
      if (clickData.menuItemId != "edgetts" || !clickData.selectionText) return;

      chrome.storage.session.set({ text: clickData.selectionText });
      chrome.sidePanel.open({ tabId: tab?.id! });
    });
  }
});
