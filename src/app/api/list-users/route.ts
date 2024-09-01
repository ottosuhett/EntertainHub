import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

// Estou abrindo o db SQLite
const openDb = () => {
  const db = new sqlite3.Database('./users.db');
  
  db.serialize(() => {
    // crio a tabela se ela nao aexistir
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

export async function GET(request: NextRequest) {
  try {
    const db = openDb();

    // to buscando todos os usuarios
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        console.error('Error fetching users:', err.message);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
      }
      console.log('Users in database:', rows);

      // Retornando os usuários como respost
      return NextResponse.json({ users: rows });
    });

    // Para garantir que sempre uma resposta seja retornada!
    // Nao fechei o banco de dados aqui, e a resposta é retornada no callback do `db.all`.
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}
