
CREATE TABLE IF NOT EXISTS Usuario (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(255) NOT NULL,
    email_login VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    

    cpf BIGINT UNIQUE DEFAULT NULL, 
    num_tel BIGINT DEFAULT NULL,
    data_nasc DATE DEFAULT NULL,
    

    nivel_acesso ENUM('admin', 'cliente') DEFAULT 'cliente',
    
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. Tabela de Tipos/Categorias
CREATE TABLE IF NOT EXISTS Tipo (
    id_tipo INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome_tipo VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. Tabela de Produtos 
CREATE TABLE IF NOT EXISTS Produto (
    id_produto INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT, -- Adicionado descrição
    valor DECIMAL(10,2) NOT NULL,
    quantidade INT DEFAULT 0, -- Adicionado controle de estoque
    imagem VARCHAR(255), -- Imagem agora é opcional
    
    id_tipo INT UNSIGNED,
    FOREIGN KEY (id_tipo) REFERENCES Tipo(id_tipo) ON DELETE SET NULL,
    
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. Tabela de Logs (Agora ligada ao Usuário)
CREATE TABLE IF NOT EXISTS Log_BD (
    id_log INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    data_evento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nivel VARCHAR(20) NOT NULL, -- INFO, WARNING, ERROR
    mensagem VARCHAR(255) NOT NULL,
    contexto TEXT,
    
 
    id_usuario INT UNSIGNED DEFAULT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Índices para deixar o banco rápido
CREATE INDEX idx_produto_tipo ON Produto(id_tipo);
CREATE INDEX idx_log_nivel ON Log_BD(nivel);
CREATE INDEX idx_log_data ON Log_BD(data_evento);