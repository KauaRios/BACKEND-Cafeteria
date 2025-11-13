<?php

// Inicia a sessão
session_start();
// Remove todas as variáveis de sessão
$_SESSION = [];


//destroi a sessao

session_destroy();







//redireciona para pagina de login



header("Location: ../frontend/index.html");
exit; // Encerra o script após o redirecionamento






?>