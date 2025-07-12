import { storage } from "#imports";

export default defineBackground({
  type: 'module',
  main: () => {
    if (import.meta.env.CHROME) browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(e => console.log(e));

    const onInstalled = async () => {
      browser.contextMenus.removeAll(() => {
        browser.contextMenus.create({
          "id": "edgetts",
          "title": "Speak with MS-Edge TTS",
          "contexts": ["selection"]
        });
      });
    };

    browser.runtime.onInstalled.addListener(onInstalled);
    browser.runtime.onStartup.addListener(onInstalled);

    const handleTextToSpeech = async (text: string) => {
      if (!text || text.length === 0) return;

      const textStorage = storage.defineItem<string>("session:text");
      textStorage.setValue(text);
    };

    const openUI = async (tab: Browser.tabs.Tab, useSidePanel?: boolean) => {
      if (import.meta.env.CHROME) {
        if (useSidePanel) {
          browser.sidePanel.open({ tabId: tab.id! });
        }
        else {
          browser.action.openPopup();
        }
      }
      else if (import.meta.env.FIREFOX) {
        // @ts-ignore
        browser.browserAction.openPopup();
      }
    }

    // Handle context menu clicks
    browser.contextMenus.onClicked.addListener(async (clickData, tab) => {
      if (clickData.menuItemId != "edgetts" || !clickData.selectionText) return;
      // TODO: add user preference for side panel or popup
      openUI(tab!, true);
      await handleTextToSpeech(clickData.selectionText);
    });

    // Handle keyboard shortcut
    browser.commands.onCommand.addListener(async (command, tab) => {
      if (command === "speak-selection") {
        // TODO: add user preference for side panel or popup
        openUI(tab, false);
        const [{ result: text }] = await browser.scripting.executeScript({
          target: { tabId: tab.id! },
          func: () => window.getSelection()?.toString() || ""
        });
        if (text) {
          handleTextToSpeech(text);
        }
      }
    });
  }
});
