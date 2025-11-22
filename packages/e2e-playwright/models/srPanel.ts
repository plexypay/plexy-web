import { Locator, Page } from '@playwright/test';

class SRPanel {
    readonly rootElement: Locator;

    constructor(page: Page, rootElementSelector: string = '.plexy-checkout-sr-panel') {
        this.rootElement = page.locator(rootElementSelector);
    }

    get allMessages() {
        return this.rootElement.locator('.plexy-checkout-sr-panel__msg').all();
    }
}

export { SRPanel };
