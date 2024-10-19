import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import  {openDb} from "../../lib/db"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  password: string;
}

const getUser = async (db: sqlite3.Database, username: string): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    db.get<User>('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};
const secretKey = process.env.JWT_SECRET || 'myVeryStrongSecretKey';
export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const db = openDb();
    // buscu o user com uma promise
    const user = await getUser(db, username);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Gera o token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '3h' });
      // Envio o token de volta para o front
      return NextResponse.json({ message: 'Login successful', token });
    } else {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({ error: 'Error during login' }, { status: 500 });
  }
}
