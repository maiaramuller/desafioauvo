const { expect } = require("@playwright/test");

exports.CheckoutInfoPage = class CheckoutInfoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators (Inputs do formulário)
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  /**
   * Preenche o formulário de entrega e continua.
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} zipCode
   */
  async fillCheckoutInfo(firstName, lastName, zipCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zipCode);
  }

  /**
   * Clica em continuar para ir ao resumo do pedido.
   */
  async continueToOverview() {
    await this.continueButton.click();
    // Valida se foi para a etapa dois (overview)
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
  }
};
