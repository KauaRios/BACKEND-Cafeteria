<?php
// config/funcoes.php


function registrar_log(PDO $pdo, string $nivel, string $mensagem, ?array $contexto = null, ?int $id_usuario = null) {
    
    // 1. SALVA NO BANCO DE DADOS 
    try {
        $contexto_str = $contexto ? json_encode($contexto, JSON_UNESCAPED_UNICODE) : null;

      
        $sql = "INSERT INTO Log_BD (nivel, mensagem, contexto, id_usuario) 
                VALUES (:nivel, :mensagem, :contexto, :id_usuario)";
        
        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':nivel'      => $nivel,
            ':mensagem'   => $mensagem,
            ':contexto'   => $contexto_str,
            ':id_usuario' => $id_usuario // Aqui ligamos o log à pessoa!
        ]);
    } catch (PDOException $e) {
        
    }

  
    try {
        $logDir = __DIR__ . '/../logs';
        $logFile = $logDir . '/app.log';

        if (!is_dir($logDir)) {
            mkdir($logDir, 0777, true);
        }

        $dataHora = date('Y-m-d H:i:s');
        
      
        $userStr = $id_usuario ? "[User ID: $id_usuario]" : "[Sistema]";
        
        $linhaLog = "[$dataHora] [$nivel] $userStr $mensagem";
        
        if ($contexto) {
            $linhaLog .= " | Dados: " . json_encode($contexto, JSON_UNESCAPED_UNICODE);
        }
        $linhaLog .= PHP_EOL;

        file_put_contents($logFile, $linhaLog, FILE_APPEND);
        
    } catch (Exception $e) {
        // Ignora erro de arquivo
    }
}
?>