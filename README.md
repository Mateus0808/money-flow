# 📌Money Flow

> O Gerenciador de Finanças Pessoais é uma aplicação web desenvolvida para ajudar os usuários a organizar e acompanhar suas transações financeiras de forma intuitiva e eficiente. Com funcionalidades avançadas, a plataforma permite registrar receitas e despesas, categorizar transações, definir recorrências e visualizar o saldo atualizado.

## 🚀 Funcionalidades

- ✅ Cadastro de Transações – Adicione receitas e despesas com valores, categorias e datas específicas.
- ✅ Classificação de Gastos – Categorize suas transações para melhor organização financeira.
- ✅ Transações Recorrentes – Defina se uma despesa ou receita é fixa para um melhor controle financeiro.
- ✅ Múltiplos Métodos de Pagamento – Escolha entre cartão de crédito, débito, pix, transferência bancária e dinheiro.
- ✅ Interface Intuitiva – Design moderno e responsivo para facilitar a navegação e usabilidade.
- ✅ Cadastro de Metas Financeiras - Crie metas financeiras e veja o seu progresso ao longo do tempo.
- ✅ Responsivo e otimizado para dispositivos móveis

## 🛠️ Tecnologias Utilizadas

A aplicação foi desenvolvida com as seguintes tecnologias:

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js
- **Banco de Dados:** MongoDB
- **Autenticação:** JWT
- **Testes:** Jest, Cypress
- **Outras bibliotecas:** Axios, React Query, Zustand, Recharts, Framer Motion

## 📦 Instalação e Configuração

### 🔧 Pré-requisitos

Certifique-se de ter instalado em seu ambiente:

- Node.js (`>=23.x`)
- npm (`>=10.9.x`)

### 🏗️ Passos para instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-projeto.git
   cd nome-do-projeto
   ```

2. Instale as dependências:

   ```bash
   npm install # ou yarn install
   ```

3. Crie um arquivo `.env` com as configurações necessárias:

   ```env
   MONGODB_URI=mongodb+srv://user:password@cluster/dbname
   JWT_SECRET=secret
   ```

4. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev # ou yarn dev
   ```

## 🏗️ Estrutura do Projeto

```
📂 nome-do-projeto
 ┣ 📂 src
 ┃ ┣ 📂 app           # Páginas da aplicação
 ┃ ┣ 📂 components    # Componentes reutilizáveis
 ┃ ┣ 📂 hooks         # Hooks da aplicação
 ┃ ┣ 📂 libs          # Bibliotecas externas
 ┃ ┣ 📂 models        # Models do banco de dados
 ┃ ┣ 📂 services      # Serviços para chamadas à API
 ┃ ┣ 📂 stores        # Gerenciador de estados
 ┃ ┣ 📂 types         # Tipagem dos dados
 ┃ ┣ 📂 utils         # Funções auxiliares
 ┃ ┗ 📜 middleware.ts # Middleware app
 ┣ 📜 package.json    # Dependências do projeto
 ┣ 📜 README.md       # Documentação do projeto
 ┗ 📜 .gitignore      # Arquivos ignorados pelo Git
```

## 🚀 Deploy

A aplicação pode ser implantada em serviços como:

- Vercel (para frontend Next.js)
- Heroku, AWS, ou Digital Ocean (para backend Node.js)

### 📤 Deploy no Vercel

```bash
vercel deploy
```

### 📤 Deploy no Heroku

```bash
heroku create nome-da-app
heroku git:remote -a nome-da-app
git push heroku main
```

## ✅ Testes

Para rodar os testes automatizados:

```bash
npm test # ou yarn test
```

## 📜 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo!

---

*Se tiver dúvidas ou sugestões, entre em contato!* 😃

