import { defineContentScript } from 'wxt/sandbox'

function getMainContent() {
    // Try extracting text from primary content containers
    const mainContent = document.querySelector('main, [role="main"], article, .content, #content, .main, #main');
    if (mainContent) {
        return extractVisibleText(mainContent);
    }

    // Fallback: Extract text from readable elements
    const contentElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
    const textContent = Array.from(contentElements)
        .filter(el => isElementVisible(el)) // Ensure only visible elements are processed
        .map(el => el.textContent?.trim() || '') // Extract text
        .filter(text => text.length > 10) // Ignore tiny text fragments
        .join('. ');

    return textContent || extractVisibleText(document.body) || '';
}

/**
 * Extracts visible text from an element, ensuring hidden elements are ignored.
 */
function extractVisibleText(element: Element): string {
    if (!isElementVisible(element)) return '';

    return Array.from(element.childNodes)
        .map(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent?.trim() || '';
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                return extractVisibleText(node as Element); // Recursively extract text
            }
            return '';
        })
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}


/**
 * Checks if an element is visible.
 */
function isElementVisible(el: Element): boolean {
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden" && parseFloat(style.opacity) > 0;
}
 


export default defineContentScript({
    matches: ['<all_urls>'],
    main() {
        browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (typeof request === 'object' && request !== null && 'action' in request && typeof request.action === 'string') {
                if (request.action === 'getPageContent') {
                    sendResponse({ content: getMainContent() });
                    return true; // Ensures the response is sent asynchronously
                }
            }
            return undefined; // Return `undefined` instead of `false`
        });
    }
});
