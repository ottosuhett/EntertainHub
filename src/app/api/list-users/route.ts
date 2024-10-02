import { NextRequest, NextResponse } from 'next/server';
import  {openDb} from "../../lib/db"
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'myVeryStrongSecretKey';
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];

  try {
     // Verifico se o token é válido
     jwt.verify(token, secretKey);

    const db = openDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          console.error('Error fetching users:', err.message);
          reject(NextResponse.json({ error: 'Error fetching users' }, { status: 500 }));
        } else {
          console.log('Users in database:', rows);
          resolve(NextResponse.json({ users: rows }));
        }
        db.close();
      });
    });

  } catch (error) {
    // Verifico se o erro é uma instância de Error
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 401 });
    } else if (error instanceof Error) {
      console.error('An error occurred:', error.message);
      return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    } else {
      console.error('An unknown error occurred:', error);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
