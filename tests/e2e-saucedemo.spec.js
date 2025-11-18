// tests/e2e-saucedemo.spec.js
const { test, expect } = require("@playwright/test");

// Importando todas as nossas Page Objects
const { LoginPage } = require("../pages/LoginPage");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutInfoPage } = require("../pages/CheckoutInfoPage");
const { CheckoutOverviewPage } = require("../pages/CheckoutOverviewPage");
const { CheckoutCompletePage } = require("../pages/CheckoutCompletePage");

test.describe("Desafio Auvo: Fluxo de Compra E2E", () => {
  // Dados de massa para o teste
  const TEST_DATA = {
    username: "standard_user",
    password: "secret_sauce",
    productName: "Sauce Labs Backpack",
    productPrice: "$29.99",
    productDescription:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    firstName: "QA",
    lastName: "Tester",
    zipCode: "90000-000",
  };

  test("Deve realizar o fluxo completo de compra com sucesso", async ({
    page,
  }) => {
    // 1. Instanciando os Page Objects
    // (Como você vem do Cypress, pense nisso como preparar seus comandos customizados)
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // --- PASSO 1: Login [cite: 4] ---
    console.log("Iniciando Login...");
    await loginPage.goto();
    await loginPage.login(TEST_DATA.username, TEST_DATA.password);

    // Validação: Garante que entrou na página de produtos
    await expect(page).toHaveURL(/inventory.html/);

    // --- PASSO 2: Navegação e Pesquisa [cite: 5] ---
    // Nota: Saucedemo não tem busca textual, então validamos a presença da lista
    console.log("Validando página de produtos...");
    await expect(productsPage.title).toHaveText("Products");

    // --- PASSO 3: Validação do Produto [cite: 6] ---
    console.log(`Validando detalhes do produto: ${TEST_DATA.productName}`);
    // Valida título, preço e descrição na listagem
    await productsPage.validateProductDetails(
      TEST_DATA.productName,
      TEST_DATA.productPrice,
      TEST_DATA.productDescription
    );

    // --- PASSO 4: Adicionar ao Carrinho e Checkout [cite: 7] ---
    console.log("Adicionando ao carrinho e indo para checkout...");
    await productsPage.addProductToCart(TEST_DATA.productName);

    // Ir para o carrinho
    await productsPage.goToCart();

    // Validação no Carrinho: O produto correto está lá?
    await expect(cartPage.cartItemName).toHaveText(TEST_DATA.productName);

    // Avançar para Checkout
    await cartPage.goToCheckout();

    // --- PASSO 5: Finalização de Pedido (Preenchimento) [cite: 8] ---
    console.log("Preenchendo dados de entrega...");
    await checkoutInfoPage.fillCheckoutInfo(
      TEST_DATA.firstName,
      TEST_DATA.lastName,
      TEST_DATA.zipCode
    );
    await checkoutInfoPage.continueToOverview();

    // --- Validação Final (Overview) ---
    console.log("Revisando pedido...");
    await expect(checkoutOverviewPage.productName).toHaveText(
      TEST_DATA.productName
    );
    // Valida se o preço total (ou do item) está correto
    await expect(checkoutOverviewPage.productPrice).toHaveText(
      TEST_DATA.productPrice
    );

    // --- Conclusão da Compra ---
    console.log("Finalizando compra...");
    await checkoutOverviewPage.finishCheckout();

    // Valida mensagem de sucesso "Thank you for your order!"
    await expect(checkoutCompletePage.completeHeader).toHaveText(
      "Thank you for your order!"
    );

    // Retorna para a home
    await checkoutCompletePage.backHome();
    await expect(page).toHaveURL(/inventory.html/);

    console.log("Fluxo finalizado com sucesso!");
  });
});
