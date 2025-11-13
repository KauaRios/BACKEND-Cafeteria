<?php

function registrar_log(PDO $pdo, string $nivel, string $mensagem, ?array $contexto = null) {
    try {
        $sql = "INSERT INTO Log_BD (nivel, mensagem, contexto) VALUES (:nivel, :mensagem, :contexto)";
        $stmt = $pdo->prepare($sql);
    
        $contexto_str = $contexto ? json_encode($contexto) : null;

        $stmt->execute([':nivel' => $nivel,
            ':mensagem' => $mensagem,
            ':contexto' => $contexto_str]);
    } catch (PDOException $e) {
        //Só para garantir que não vai travar em loop infinito...
    }




    $logDir = __DIR__ . '/../logs';
    $logFile = $logDir . '/app.log';



    if(!is_dir($logDir)) {
        mkdir($logDir, 0777, true);
    }



    $logEntry = "[" . date('Y-m-d H:i:s') . "] [$nivel] $mensagem";
    if ($contexto) {
        $logEntry .= ' | Contexto: ' . json_encode($contexto);
    }
    $logEntry .= PHP_EOL;
    //escreve no arquivo de log
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}