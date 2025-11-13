<?php
// index.php na raiz

// Redireciona o usuário automaticamente para a tela de login
header("Location: auth/login.php");
exit; // Encerra o script para garantir que o redirecionamento aconteça
?>