//import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

// ----- db functions 

// Função abre o db do SQLite
/*const openDb = () => {
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
  };*/

  // getGameList
  const getGameList = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=16`;
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar jogos');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Erro ao buscar os jogos:', error);
      return [];
    }
  };
  
export {getGameList}