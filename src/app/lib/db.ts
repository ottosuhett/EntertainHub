import sqlite3 from 'sqlite3';

// Função para abrir conexão com o banco de dados
export const openDb = (): sqlite3.Database => {
  const db = new sqlite3.Database('./users.db');

  db.serialize(() => {
    // Cria a tabela se não existir
    db.run(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)',
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table "users" is ready.');
        }
      }
    );
  });

  return db;
};