import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

// ----- db functions 

// Função abre o db do SQLite
const openDb = () => {
    const db = new sqlite3.Database('./users.db');
  
    db.serialize(() => {
      // Cria a tabela se não existi
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

export {openDb}