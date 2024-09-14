import { NextRequest, NextResponse } from 'next/server';
//import {openDb} from "@/app/functions/genericFunctions"
import sqlite3 from 'sqlite3';

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
export async function GET(request: NextRequest) {
  try {
    const db = openDb();

    // Usando promessas para garantir que a resposta seja retornada após o callback
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          console.error('Error fetching users:', err.message);
          reject(NextResponse.json({ error: 'Error fetching users' }, { status: 500 }));
        } else {
          console.log('Users in database:', rows);
          resolve(NextResponse.json({ users: rows }));
        }
      });
    });

  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}
