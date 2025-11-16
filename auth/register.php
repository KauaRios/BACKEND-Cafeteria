<?php
// auth/register.php


// 1. HEADERS DA API (PARA PERMITIR A CONEXÃO COM O REACT)


header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json'); // Sempre responderá com JSON

// Responde a requisições OPTIONS (pre-flight request do navegador)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
// -----------------------------------------------------------------

session_start(); 
require_once __DIR__ . "/../config/db.php"; 
require_once __DIR__ . "/../config/funcoes.php";

// Verifica se o método é POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // 405 = Method Not Allowed
    echo json_encode(['success' => false, 'error' => 'Método não permitido.']);
    exit;
}

try {
   //validaçoes
    $name = trim($_POST["name"] ?? '');
    $email = trim($_POST["email"] ?? '');
    $password = trim($_POST["password"] ?? '');
    
    // Campos adicionais (convertendo string vazia '' para null)
    $cpf = trim($_POST["cpf"] ?? '');
    $cpf = $cpf === '' ? null : $cpf;
    
    $num_tel = trim($_POST["num_tel"] ?? '');
    $num_tel = $num_tel === '' ? null : $num_tel;

    $data_nasc = trim($_POST["data_nasc"] ?? '');
    $data_nasc = $data_nasc === '' ? null : $data_nasc;


    // Validações básicas
    if (empty($name) || empty($email) || empty($password)) {
        http_response_code(400); // 400 = Bad Request
        echo json_encode(['success' => false, 'error' => 'Nome, email e senha são obrigatórios.']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Formato de email inválido.']);
        exit;
    }

    // Verifica duplicidade de email
    $stmt = $pdo->prepare("SELECT id FROM Usuario WHERE email_login = :email");
    $stmt->execute([':email' => $email]);

    if ($stmt->fetch()) {
        http_response_code(409); // 409 = Conflict (Email já existe)
        echo json_encode(['success' => false, 'error' => 'Ops! Parece que este email já está em uso.']);
        exit;
    }
    
    //  Verifica duplicidade de CPF
    if ($cpf) {
        $stmt_cpf = $pdo->prepare("SELECT id FROM Usuario WHERE cpf = :cpf");
        $stmt_cpf->execute([':cpf' => $cpf]);
        if ($stmt_cpf->fetch()) {
            http_response_code(409);
            echo json_encode(['success' => false, 'error' => 'Ops! Este CPF já está cadastrado.']);
            exit;
        }
    }

    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    

    
    $sql = "INSERT INTO Usuario (nome, email_login, senha_hash, cpf, num_tel, data_nasc) 
            VALUES (:name, :email, :password_hash, :cpf, :num_tel, :data_nasc)";
            
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':password_hash' => $hashedPassword,
        ':cpf' => $cpf,
        ':num_tel' => $num_tel,
        ':data_nasc' => $data_nasc
    ]);

    $novoId = $pdo->lastInsertId();

    if(function_exists('registrar_log')) {
        registrar_log($pdo, 'INFO', 'Novo usuário registrado', ['email' => $email], $novoId);
    }

   
    http_response_code(201); // 201 = Created
    echo json_encode(['success' => true, 'message' => 'Cadastro Realizado com sucesso!']);
    exit;

} catch (PDOException $e) {
    if(function_exists('registrar_log')) {
        registrar_log($pdo, 'ERROR', 'Falha ao registrar', ['error_message'=> $e->getMessage()]);
    }
   
    //RESPOSTA DE ERRO EM JSON
    
    http_response_code(500); // 500 = Internal Server Error
    echo json_encode(['success' => false, 'error' => 'Erro no sistema. Tente novamente mais tarde.']);
    exit;
}


?>
