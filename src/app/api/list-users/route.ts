import { NextRequest, NextResponse } from 'next/server';
import  {openDb} from "../../lib/db"

export async function GET(request: NextRequest) {
  try {
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
      });
    });

  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}
