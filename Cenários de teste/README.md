# 📖 Especificação de Cenários de Teste (BDD)

Este documento descreve os comportamentos esperados do sistema utilizando a sintaxe Gherkin (Dado, Quando, Então). Estes cenários servem como base para os scripts de automação desenvolvidos com Playwright.

## 🛒 Funcionalidade: Fluxo de Compra End-to-End (Desafio)

**Objetivo:** Garantir que o fluxo crítico de negócio (compra de produtos) esteja funcionando para o usuário padrão.

Funcionalidade: Comprar Produto
Como um cliente do e-commerce Swag Labs
Quero selecionar um item e finalizar o pedido
Para que eu possa receber o produto em minha casa

Cenário: Realizar uma compra completa com sucesso (Caminho Feliz)
Dado que acesso a página de login do Saucedemo
E realizo login com o usuário "standard_user"
Quando navego para a página de listagem de produtos
E valido que o produto "Sauce Labs Backpack" existe e custa "$29.99"
E adiciono este produto ao carrinho
E acesso a página do carrinho de compras
E prossigo para a tela de Checkout
E preencho os dados de entrega (Nome: "QA", Sobrenome: "Tester", CEP: "90000-000")
E confirmo que o produto correto está no resumo do pedido
E finalizo a compra
Então devo visualizar a mensagem de sucesso "Thank you for your order!"
E ao clicar em voltar, devo ser redirecionado para a página inicial

## Funcionalidade: Login e Exceções

Como um administrador do sistema
Quero validar diferentes perfis de usuários e tentativas de acesso
Para garantir a segurança e a estabilidade da aplicação

Cenário: Validar bloqueio de acesso (Locked Out User)
Dado que acesso a página de login
Quando tento logar com o usuário "locked_out_user" e a senha padrão
Então o sistema deve impedir o acesso
E devo visualizar uma mensagem de erro contendo "Sorry, this user has been locked out"

Cenário: Validar credenciais inválidas
Dado que acesso a página de login
Quando tento logar com o usuário "standard_user" e uma senha incorreta
Então devo visualizar uma mensagem de erro contendo "Username and password do not match"

Cenário: Validar falha visual de carregamento (Problem User)
Dado que acesso a página de login
Quando realizo login com o usuário "problem_user"
E acesso a listagem de produtos
Então devo identificar que a imagem do produto foi substituída pela imagem de erro ("sl-404")

Cenário: Validar performance no login (Performance Glitch User)
Dado que acesso a página de login
Quando realizo login com o usuário "performance_glitch_user"
Então o sistema deve aguardar o tempo de carregamento extra automaticamente
E o login deve ser concluído com sucesso redirecionando para a home
