<?php
// config/funcoes.php

// Funçao para registrar logs de eventos
function registrar_log(PDO $pdo, string $nivel, string $mensagem, ?array $contexto = null, ?int $id_usuario = null) {
    
    // 1. SALVA NO BANCO DE DADOS 
    try {
        // Converte o contexto em JSON
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
        //  SALVA EM ARQUIVO DE LOG
        $logDir = __DIR__ . '/../logs';
        // Define o caminho do arquivo de log
        $logFile = $logDir . '/app.log';


        // Cria o diretório de logs se não existir
        if (!is_dir($logDir)) {
            mkdir($logDir, 0777, true);
        }

        $dataHora = date('Y-m-d H:i:s');
        
      //se id_usuario for passado, inclui no log
        $userStr = $id_usuario ? "[User ID: $id_usuario]" : "[Sistema]";
        // Monta a linha do log
        $linhaLog = "[$dataHora] [$nivel] $userStr $mensagem";
        
        // Adiciona contexto se houver
        if ($contexto) {
            $linhaLog .= " | Dados: " . json_encode($contexto, JSON_UNESCAPED_UNICODE);
        }
        // Quebra de linha
        $linhaLog .= PHP_EOL;
        // Escreve no arquivo
        file_put_contents($logFile, $linhaLog, FILE_APPEND);
    
    } 
    catch (Exception $e) {
        // Ignora erro de arquivo
    }
}
?>