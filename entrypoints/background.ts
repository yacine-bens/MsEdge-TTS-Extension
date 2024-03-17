export default defineBackground({
  type: 'module',
  include: ['chrome'],
  main: () => {
    // console.log('Hello background!', { id: chrome.runtime.id });

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

      console.log('context menu click');
      
      chrome.storage.session.set({ text: clickData.selectionText });
      chrome.sidePanel.open({ tabId: tab?.id! });
    });
  }
});
