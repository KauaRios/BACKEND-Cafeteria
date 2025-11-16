<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
// Permite que o navegador envie e receba cookies
header("Access-Control-Allow-Credentials: true");
// Especifica os métodos permitidos
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// Especifica os headers permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Responde a requisições OPTIONS (pre-flight request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// auth/login.php
session_start();
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/funcoes.php';

// PHP conversa com JSON
header("Content-Type: application/json");

$email = trim($_POST['email'] ?? ''); 
$password = trim($_POST['password'] ?? ''); 

if (empty($email) || empty($password)) {
    http_response_code(400);// Bad Request
 
    echo json_encode(['success' => false, 'error' => 'E-mail e senha são obrigatórios.']);
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

        //ManterConectado
        if (isset($_POST['manter_conectado'])) {
            //gera os tokens de segurança
            $token = bin2hex(random_bytes(32));
            $token_hash = hash('sha256', $token);
            $user_id = $user['id'];

            //sql para inserir o token no banco
            $sql = "INSERT INTO auth_tokens (user_id, token_hash, expires_at) 
                        VALUES (?, ?, NOW() + INTERVAL 30 DAY)";

            $stmt_token = $pdo->prepare($sql);
            $stmt_token->execute([$user_id, $token_hash]);

            //Envia o cookie para o navegador
            setcookie(
                'remember_me', $token, 
                time() + (86400 * 30), // 30 dias
                '/',
                '', // 
                true, 
                true  
            );
        }

        if (function_exists('registrar_log')) {
            //$user['id'] no final para ligar o log à pessoa no Banco
            registrar_log($pdo, 'INFO', 'Login bem-sucedido', ['email' => $email], $user['id']);
        }

    
        echo json_encode([
            'success' => true,
            'user_name' => $user['nome'],
        ]);
        exit;
        
    } else {
    
        if (function_exists('registrar_log')) {
            registrar_log($pdo, 'WARNING', 'Tentativa de login falhou', ['email' => $email]);
        }
        http_response_code(401); // Unauthorized
   
        echo json_encode([
            'success' => false,
            'error' => 'E-mail ou senha incorretos.'
        ]);
        exit;
    }

} catch (PDOException $e) {
    if (function_exists('registrar_log')) {
        registrar_log($pdo, 'ERROR', 'Erro de BD no login', ['error_message' => $e->getMessage()]);
    }
    http_response_code(500); // Internal Server Error
  
    echo json_encode([
        'success' => false,
        'error' => 'Erro no servidor. Tente novamente mais tarde.'
    ]);
    exit;
}
?>
