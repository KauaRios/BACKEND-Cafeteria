import { StrictMode } from 'react' // StrictMode: ativa checagens adicionais em desenvolvimento
import ReactDOM from 'react-dom/client' // ReactDOM: API do DOM do React (não usada diretamente aqui)
import { createRoot } from 'react-dom/client' // createRoot: cria a raiz para renderização do React
import './index.css' // importa estilos globais
import App from './App.jsx' // componente raiz da aplicação

import { createBrowserRouter, RouterProvider } from "react-router-dom"; // cria e provê o roteador baseado em URL
import Cardapio from '../components/Cardápio/Cardapio.jsx'; // componente da página de cardápio
import Cadastro from '../components/Cadastro/Cadastro.jsx' // componente da página de cadastro
import Login from '../components/Login/Login.jsx' // componente da página de login

const router = createBrowserRouter([ // define as rotas da aplicação
  {
    path: "/", // rota raiz — renderiza App
    element: <App />,
  },
  {
    path: "/cardapio", // rota /cardapio — renderiza Cardapio
    element: <Cardapio />,
  },
  {
    path: "/login", // rota /login — renderiza Login
    element: <Login />
  },
  {
    path: "/cadastro", // rota /cadastro — renderiza Cadastro
    element: <Cadastro />
  }
]);

createRoot(document.getElementById('root')).render( // monta a aplicação na div #root
  <StrictMode>
    <RouterProvider router={router} /> // fornece o roteador para toda a árvore de componentes
  </StrictMode>,
)
