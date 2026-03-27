const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Conectar ao SQLite
const db = new sqlite3.Database('./database.db');

// Criar tabela de produtos
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL, imagem TEXT)");
    
    // Inserir dados iniciais se estiver vazio
    db.get("SELECT count(*) as count FROM produtos", (err, row) => {
        if (row.count === 0) {
            db.run("INSERT INTO produtos (nome, preco, imagem) VALUES ('Camiseta Basic', 49.90, 'https://via.placeholder.com/150')");
            db.run("INSERT INTO produtos (nome, preco, imagem) VALUES ('Calça Jeans', 129.00, 'https://via.placeholder.com/150')");
            db.run("INSERT INTO produtos (nome, preco, imagem) VALUES ('Jaqueta Couro', 250.00, 'https://via.placeholder.com/150')");
        }
    });
});

// Rota para listar produtos
app.get('/api/produtos', (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        res.json(rows);
    });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));