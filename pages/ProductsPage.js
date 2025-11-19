// pages/ProductsPage.js
const { expect } = require("@playwright/test");

exports.ProductsPage = class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // --- Localizadores Principais da Página ---

    // Título da página (Ex: "Products")
    this.title = page.locator('[data-test="title"]');

    // Ícone do carrinho de compras
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');

    // Localizador para o contêiner de um item de inventário
    this.productContainer = page.locator('[data-test="inventory-item"]');
  }

  // --- Métodos de Ação e Validação ---

  /**
   * Retorna o contêiner de um produto específico, filtrando pelo nome.
   * @param {string} productName - O nome exato do produto (ex: "Sauce Labs Backpack")
   * @returns {import('@playwright/test').Locator}
   */
  getProductContainer(productName) {
    // Filtra todos os 'inventory-item' para encontrar aquele
    // que contém o texto do productName.
    return this.productContainer.filter({ hasText: productName });
  }

  /**
   * Valida o preço e a descrição de um produto específico na lista.
   * @param {string} productName - O nome do produto
   * @param {string} productPrice - O preço esperado (ex: "$29.99")
   * @param {string} productDescription - O texto da descrição esperada
   */
  async validateProductDetails(productName, productPrice, productDescription) {
    // 1. Encontra o contêiner do produto específico
    const product = this.getProductContainer(productName);

    // 2. Localiza os elementos *dentro* desse contêiner e faz as asserções
    const descriptionLocator = product.locator(
      '[data-test="inventory-item-desc"]'
    );
    const priceLocator = product.locator('[data-test="inventory-item-price"]');

    // 3. Valida os textos (o 'expect' do Playwright espera automaticamente)
    await expect(descriptionLocator).toHaveText(productDescription);
    await expect(priceLocator).toHaveText(productPrice);
  }

  /**
   * Adiciona um produto ao carrinho clicando no seu botão "Add to cart".
   * @param {string} productName - O nome do produto
   */
  async addProductToCart(productName) {
    // Constrói o seletor dinâmico baseado no nome do produto
    const dataTestSelector = `add-to-cart-${productName
      .toLowerCase()
      .replace(/ /g, "-")}`;

    // Localiza e clica no botão usando o seletor dinâmico
    const addButton = this.page.locator(`[data-test="${dataTestSelector}"]`);
    await addButton.click();

    // (Opcional) Validar se o botão mudou para "Remove"
    const removeButton = this.page.locator(
      `[data-test="remove-${productName.toLowerCase().replace(/ /g, "-")}"]`
    );
    await expect(removeButton).toBeVisible();
  }

  /**
   * Navega para a página do carrinho de compras.
   */
  async goToCart() {
    await this.cartLink.click();
    // Valida se a URL mudou para a página do carrinho
    await expect(this.page).toHaveURL(/cart.html/);
  }
};
