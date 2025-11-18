const { expect } = require("@playwright/test");

exports.CheckoutCompletePage = class CheckoutCompletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Retorna para a home page após a compra.
   */
  async backHome() {
    await this.backHomeButton.click();
  }
};
