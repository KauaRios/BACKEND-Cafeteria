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
}