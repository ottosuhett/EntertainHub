import sqlite3 from 'sqlite3';

export const openDb = (): sqlite3.Database => {
  const db = new sqlite3.Database('./users.db');

  db.serialize(() => {
    // Cria a tabela 'users' se não existir
    db.run(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)',
      (err) => {
        if (err) {
          console.error('Error creating table "users":', err.message);
        } else {
          console.log('Table "users" is ready.');
        }
      }
    );

    // Cria a tabela 'userListGroups' se não existir
    db.run(
      `CREATE TABLE IF NOT EXISTS userListGroups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL,
        listName TEXT NOT NULL,
        listGroup TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table "userListGroups":', err.message);
        } else {
          console.log('Table "userListGroups" is ready.');
        }
      }
    );

    // Cria a tabela 'user_games' 
    db.run(
      `CREATE TABLE IF NOT EXISTS user_games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        game_id INTEGER NOT NULL,
        progress INTEGER NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table "user_games":', err.message);
        } else {
          console.log('Table "user_games" is ready.');
        }
      }
    );
  });

  return db;
};
