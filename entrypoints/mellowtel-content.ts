import Mellowtel from "mellowtel";
const CONFIGURATION_KEY = "YzQ3ODQ0Yjg=";

export default defineContentScript({
    matches: ["<all_urls>"],
    runAt: "document_start",
    include: ['chrome'],
    allFrames: true,
    main: async () => {
        const mellowtel = new Mellowtel(atob(CONFIGURATION_KEY), {
            MAX_DAILY_RATE: 500,
        });
        
        await mellowtel.initContentScript();
    }
});