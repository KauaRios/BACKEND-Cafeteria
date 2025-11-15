# IN THE PUB WEBSITE

![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow)

Sistema Webv (Front-end) interativo para o "In The Pub", com foco em design moderno, ícones (Lucide) e animações fluidas (GSAP).

## 🛠️ Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface.
* **Vite:** Ferramenta de build (compilação) e servidor de desenvolvimento rápido.
* **JavaScript:** Linguagem de programação base.
* **Tailwind CSS:** Framework CSS utility-first para estilização rápida.
* **GSAP (GreenSock):** Biblioteca de animação para interações.
* **Lucide React:** Biblioteca de ícones SVG.
* **NPM:** Gerenciador de pacotes do Node.js.

---

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto em seu ambiente local.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [NPM](https://www.npmjs.com/) (geralmente instalado com o Node.js)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Matheus-Tsuji/frontend-projeto-web-faculdade.git](https://github.com/Matheus-Tsuji/frontend-projeto-web-faculdade.git)
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd frontend-projeto-web-faculdade
    ```

3.  **Instale TODAS as dependências:**
    ```bash
    npm install
    ```
    *(Este comando lê o `package.json` e instala tudo, incluindo React, Vite, Tailwind, GSAP e Lucide de uma só vez.)*

4.  **Inicie o servidor de desenvolvimento (Vite):**
    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

---

## 📝 Notas de Instalação (Dependências)

Esta seção é apenas um registro de como as dependências principais foram adicionadas ao projeto. **Não é necessário rodar isso se você clonou o projeto** (use o `npm install` acima).

* **Tailwind CSS (com Vite):**
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```