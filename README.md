# Desafio QA Auvo - POC Automação Web

[cite_start]Este projeto é uma Prova de Conceito (POC) de automação de testes web, desenvolvida como parte do processo seletivo da Auvo[cite: 1]. [cite_start]O objetivo é validar o fluxo crítico de compra (E2E) no site de e-commerce fictício [SauceDemo](https://www.saucedemo.com/)[cite: 2].

## 🛠️ Tecnologias Utilizadas

[cite_start]O projeto foi construído seguindo os requisitos do desafio[cite: 10, 11]:

- **Linguagem:** JavaScript
- **Framework de Teste:** Playwright
- **Runtime:** Node.js
- **Arquitetura:** Page Object Model (POM)

## 📋 Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (Versão 16 ou superior)
- Git

## 🚀 Instalação e Configuração

Siga os passos abaixo para configurar o ambiente localmente:

1.  **Clone o repositório:**

    ```bash
    git clone [INSIRA_AQUI_O_LINK_DO_SEU_GITHUB]
    cd desafio-auvo-playwright
    ```

2.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

3.  **Instale os navegadores do Playwright:**
    ```bash
    npx playwright install
    ```

## 🏗️ Estrutura do Projeto (Page Object Model)

[cite_start]O projeto segue estritamente o padrão **Page Object Model (POM)** para garantir organização, reutilização de código e facilidade de manutenção[cite: 12, 19].

```text
desafio-auvo-playwright/
├── 📁 pages/                  # Classes representando as páginas da aplicação
│   ├── LoginPage.js           # Login
│   ├── ProductsPage.js        # Listagem e seleção de produtos
│   ├── CartPage.js            # Carrinho de compras
│   ├── CheckoutInfoPage.js    # Dados de entrega
│   ├── CheckoutOverviewPage.js# Resumo do pedido
│   └── CheckoutCompletePage.js# Finalização
├── 📁 tests/                  # Arquivos de teste (Specs)
│   └── e2e-saucedemo.spec.js  # Teste E2E cobrindo o fluxo completo
├── 📁 playwright-report/      # Relatórios gerados automaticamente
├── 📄 playwright.config.js    # Configurações globais do Playwright
└── 📄 README.md               # Documentação do projeto
```
