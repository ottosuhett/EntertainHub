import { NextRequest, NextResponse } from 'next/server';
//import {openDb} from "@/app/functions/genericFunctions"
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
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
export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const db = openDb();
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) {
        console.error(err.message);
        return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
      }
      db.close();
    });

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}
