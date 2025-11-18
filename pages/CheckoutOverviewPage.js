const { expect } = require("@playwright/test");

exports.CheckoutOverviewPage = class CheckoutOverviewPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  /**
   * Finaliza a compra clicando no botão Finish.
   */
  async finishCheckout() {
    await this.finishButton.click();
    // Valida se foi para a tela de conclusão
    await expect(this.page).toHaveURL(/checkout-complete.html/);
  }
};
