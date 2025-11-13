<?php
// auth/login.php
session_start();
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/funcoes.php';

$email = trim($_POST['email'] ?? ''); 
$password = trim($_POST['password'] ?? ''); 

if (empty($email) || empty($password)) {
    $error = "Preencha e-mail e senha.";
    header("Location: ../frontend/index.html?error=" . urlencode($error));
    exit;
}

try {
    //quando usuario tenta logar, busca no banco
    $stmt = $pdo->prepare("SELECT * FROM Usuario WHERE email_login = :email LIMIT 1");
    //executa a busca
    $stmt->execute([':email' => $email]);
    //pega o resultado
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    //verifica se achou e se a senha bate
    if ($user && password_verify($password, $user['senha_hash'])) {
        // Configura variáveis de sessão
        $_SESSION['user_id'] = $user['id']; 
        $_SESSION['user_name'] = $user['nome'];
        $_SESSION['user_email'] = $user['email_login'];
        $_SESSION['logged_in'] = true;

        if(function_exists('registrar_log')) {
          
            //$user['id'] no final para ligar o log à pessoa no Banco
            registrar_log($pdo, 'INFO', 'Login bem-sucedido', ['email' => $email], $user['id']);
        }
        
        header("Location: ../dashboard.php");
        exit;
        
    } else {
        /
        if(function_exists('registrar_log')) {
            registrar_log($pdo, 'WARNING', 'Tentativa de login falhou', ['email' => $email]);
        }
        $error = "E-mail ou senha inválidos.";
        header("Location: ../frontend/index.html?error=" . urlencode($error));
        exit;
    }

} catch (PDOException $e) {
    if(function_exists('registrar_log')) {
        registrar_log($pdo, 'ERROR', 'Erro de BD no login', ['error_message' => $e->getMessage()]);
    }
    $error = "Erro no sistema. Tente mais tarde.";
    header("Location: ../frontend/index.html?error=" . urlencode($error));
    exit;
}
?>