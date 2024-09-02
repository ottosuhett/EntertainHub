import { NextRequest, NextResponse } from 'next/server';
import {openDb} from "@/app/functions/genericFunctions"
import sqlite3 from 'sqlite3';

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
