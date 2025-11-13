<?php 
// auth/register.php
session_start(); 

require_once __DIR__ . "/../config/db.php"; 
require_once __DIR__ . "/../config/funcoes.php";

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

   
    $name = trim($_POST["name"] ?? '');
    $email = trim($_POST["email"] ?? '');
    $password = trim($_POST["password"] ?? '');

    if (empty($name) || empty($email) || empty($password)) {
        $error = "Todos os campos são obrigatórios.";

    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Formato de email inválido.";

    } else {
        try {
            // Verifica duplicidade
            $stmt = $pdo->prepare("SELECT id FROM Usuario WHERE email_login = :email");
            $stmt->execute([':email' => $email]);

            if ($stmt->fetch()) {
                if(function_exists('registrar_log')) {
                    registrar_log($pdo, 'WARNING', 'Tentativa de cadastro duplicado', ['email' => $email]);
                }
                $error = "Ops! Parece que este email já está em uso.";
            } else {
                // Criptografa
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                // Insere
                $stmt = $pdo->prepare("INSERT INTO Usuario (nome, email_login, senha_hash) VALUES (:name, :email, :password_hash)");

                $stmt->execute([
                    ':name' => $name,
                    ':email' => $email,
                    ':password_hash' => $hashedPassword
                ]);

           
                $novoId = $pdo->lastInsertId();

              
                if(function_exists('registrar_log')) {
                    registrar_log($pdo, 'INFO', 'Novo usuário registrado', ['email' => $email], $novoId);
                }

                header("Location: ../frontend/index.html?sucess=" . urlencode("Cadastro Realizado com sucesso! Faça seu login."));
                exit; 
            }
        } catch (PDOException $e) {
            if(function_exists('registrar_log')) {
                registrar_log($pdo, 'ERROR', 'Falha ao registrar', ['error_message'=> $e->getMessage()]);
            }
            $error = "Erro no sistema. Tente novamente mais tarde.";
        }
    } 
} 
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Registrar</title>
</head>
<body>
    <h2>Registrar</h2>

    <?php if (!empty($error)): ?>
        <p style="color: red;"><?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>

    <form method="POST">
        <input 
            type="text" 
            name="name" 
            placeholder="Nome" 
            required 
            value="<?php echo htmlspecialchars($_POST['name'] ?? ''); ?>"
        ><br><br>

        <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>"
        ><br><br>

        <input 
            type="password" 
            name="password" 
            placeholder="Senha" 
            required
        ><br><br>

        <button type="submit">Registrar</button>
    </form>
</body>
</html>