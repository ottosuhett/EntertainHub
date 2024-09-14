import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

interface User {
  id: number;
  username: string;
  password: string;
}
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
const getUser = (db: sqlite3.Database, username: string): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    db.get<User>('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const db = openDb();
    
    // a função getUser busca o usuário com uma promise
    const user = await getUser(db, username);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return NextResponse.json({ message: 'Login successful' });
    } else {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({ error: 'Error during login' }, { status: 500 });
  }
}
