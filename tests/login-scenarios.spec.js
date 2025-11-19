// tests/login-scenarios.spec.js
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

test.describe("Cenários Alternativos de Login (Bônus)", () => {
  // Instanciamos a página antes de cada teste
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  const password = "secret_sauce";

  test("Deve exibir erro ao tentar logar com usuário bloqueado (locked_out_user)", async ({
    page,
  }) => {
    // 1. Tenta logar com o usuário bloqueado
    await loginPage.login("locked_out_user", password);

    // 2. Valida se a mensagem de erro apareceu
    // Nota: O locator 'errorMessage' já criamos na sua LoginPage.js
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Sorry, this user has been locked out"
    );
  });

  test("Deve validar que o problem_user vê a imagem do cachorro (erro) ao invés do produto", async ({
    page,
  }) => {
    // 1. Loga com o usuário problemático
    await loginPage.login("problem_user", password);

    // 2. Verifica se entrou na home
    await expect(page).toHaveURL(/inventory.html/);

    // 3. Validação Visual:
    // A imagem do cachorro tem o nome de arquivo "sl-404.jpg" no código.
    // Vamos verificar se ELA está visível na tela, o que indica o erro.
    const dogImage = page.locator('img[src*="sl-404"]').first();

    await expect(dogImage).toBeVisible();

    console.log(
      "Validado: O usuário está vendo a imagem do cachorro em vez do produto."
    );
  });

  test("Deve aguardar o carregamento com usuário de performance lenta (performance_glitch_user)", async ({
    page,
  }) => {
    // Este usuário demora propositalmente para logar.
    // O Playwright aguarda automaticamente, mas este teste serve para garantir
    // que o sistema não dá "timeout" e eventualmente carrega.

    const startTime = Date.now();

    await loginPage.login("performance_glitch_user", password);
    await expect(page).toHaveURL(/inventory.html/);

    const duration = Date.now() - startTime;
    console.log(`Login concluído em ${duration}ms`);

    // Opcional: Verificar se o título apareceu
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("Deve exibir erro ao tentar logar com credenciais inválidas", async ({
    page,
  }) => {
    // Teste negativo clássico
    await loginPage.login("standard_user", "senha_errada");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match"
    );
  });
});
