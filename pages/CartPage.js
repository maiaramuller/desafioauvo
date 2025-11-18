const { expect } = require("@playwright/test");

exports.CartPage = class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.cartItemName = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Clica no botão de checkout para prosseguir.
   */
  async goToCheckout() {
    await this.checkoutButton.click();
    // Valida se mudou para a tela de preenchimento de dados
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }
};
