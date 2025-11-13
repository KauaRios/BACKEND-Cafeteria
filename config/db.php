<?php
$envPath = __DIR__ . '/../.env';

if(file_exists($envPath)){
    $env = parse_ini_file($envPath);
} else {
   
    die("Erro Crítico: Arquivo .env não encontrado.");
}

// Configurações
$host = 'db'; 
$db_name = $env['MYSQL_DB_NAME']; 
$user = 'root';                   
$pass = $env['MYSQL_ROOT_PASS'];  
$charset = 'utf8mb4';


$port = 3306; 

$dsn = "mysql:host=$host;port=$port;dbname=$db_name;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {

    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Caso haja erro, registra no log

} catch (\PDOException $e) {
        registrar_log($pdo, 'ERROR', 'Falha na conexão com o banco de dados', ['error_message'=> $e->getMessage()]);
        
//
    if (!is_dir($log_path)) {
        mkdir($log_path, 0755, true);
    }

    $error_message = "[" . date('Y-m-d H:i:s') . "] Erro: " . $e->getMessage() . PHP_EOL;
    file_put_contents($log_file, $error_message, FILE_APPEND | LOCK_EX);

    // Lança o erro para parar o script
    throw new \PDOException("Erro fatal: Não foi possível conectar ao banco.", (int)$e->getCode());
}
?>