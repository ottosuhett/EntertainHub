import { NextRequest, NextResponse } from 'next/server';
import  {openDb} from "../../lib/db"
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  const db = openDb();

  try {
    // Verifico se o usuário já existe
    const userExists = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) reject(err);
        // Retorno true se o usuário existe
        resolve(!!row); 
      });
    });

    if (userExists) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insero o novo usuário no db
    await new Promise((resolve, reject) => {
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) reject(err);
        resolve(null);
      });
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  } finally {
    db.close();
  }
}
