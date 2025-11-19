// tests/e2e-saucedemo.spec.js
const { test, expect } = require("@playwright/test");

// Importando as Pages
const { LoginPage } = require("../pages/LoginPage");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutInfoPage } = require("../pages/CheckoutInfoPage");
const { CheckoutOverviewPage } = require("../pages/CheckoutOverviewPage");
const { CheckoutCompletePage } = require("../pages/CheckoutCompletePage");

test.describe("Desafio Auvo: Fluxo de Compra E2E", () => {
  // Massa de dados
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

  test("Deve completar a compra de um produto com sucesso", async ({
    page,
  }) => {
    // Instanciando as Pages
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // --- ETAPA 1: LOGIN ---
    await test.step("1. Login na aplicação", async () => {
      console.log("Iniciando Login...");
      await loginPage.goto();
      await loginPage.login(TEST_DATA.username, TEST_DATA.password);
      await expect(page).toHaveURL(/inventory.html/);
    });

    // --- ETAPA 2: NAVEGAÇÃO E PESQUISA ---
    await test.step("2. Navegação e Pesquisa de Produtos", async () => {
      console.log("Validando acesso à página de produtos...");
      await expect(productsPage.title).toHaveText("Products");

      // Verificamos se o produto existe na lista (simulando a pesquisa)
      const produto = productsPage.getProductContainer(TEST_DATA.productName);
      await expect(produto).toBeVisible();
    });

    // --- ETAPA 3: VALIDAÇÃO DO PRODUTO ---
    await test.step("3. Validação dos Detalhes do Produto", async () => {
      console.log(`Validando dados do produto: ${TEST_DATA.productName}`);
      await productsPage.validateProductDetails(
        TEST_DATA.productName,
        TEST_DATA.productPrice,
        TEST_DATA.productDescription
      );
    });

    // --- ETAPA 4: CARRINHO E CHECKOUT ---
    await test.step("4. Adicionar ao Carrinho e Iniciar Checkout", async () => {
      console.log("Adicionando ao carrinho...");
      await productsPage.addProductToCart(TEST_DATA.productName);
      await productsPage.goToCart();

      // Validação visual no carrinho
      await expect(cartPage.cartItemName).toHaveText(TEST_DATA.productName);

      console.log("Indo para o checkout...");
      await cartPage.goToCheckout();
    });

    // --- ETAPA 5: FINALIZAÇÃO DO PEDIDO ---
    await test.step("5. Preenchimento e Finalização", async () => {
      console.log("Preenchendo dados de entrega...");
      await checkoutInfoPage.fillCheckoutInfo(
        TEST_DATA.firstName,
        TEST_DATA.lastName,
        TEST_DATA.zipCode
      );
      await checkoutInfoPage.continueToOverview();

      // Validação final antes de comprar
      console.log("Revisão final...");
      await expect(checkoutOverviewPage.productName).toHaveText(
        TEST_DATA.productName
      );
      await expect(checkoutOverviewPage.productPrice).toHaveText(
        TEST_DATA.productPrice
      );

      // Finalizar
      await checkoutOverviewPage.finishCheckout();

      // Validação de Sucesso
      await expect(checkoutCompletePage.completeHeader).toHaveText(
        "Thank you for your order!"
      );
      await checkoutCompletePage.backHome();
      await expect(page).toHaveURL(/inventory.html/);
    });
  });
});
