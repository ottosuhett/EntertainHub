import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '../../lib/db';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'myVeryStrongSecretKey';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user'); // Obtém o nome do usuário a partir da query string

  if (!user) {
    return NextResponse.json({ error: 'User is required' }, { status: 400 });
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];

  try {
    // Verifica se o token é válido
    jwt.verify(token, secretKey);

    // Abre o banco de dados
    const db = openDb();

    return new Promise((resolve, reject) => {
      db.get<{ listGroup: string }>(
        'SELECT listGroup FROM userListGroups WHERE user = ?',
        [user],
        (err, row) => {
          if (err) {
            console.error('Error fetching listGroup:', err.message);
            reject(NextResponse.json({ error: 'Error fetching listGroup' }, { status: 500 }));
          } else if (row && row.listGroup) {
            console.log(`ListGroup encontrado para o usuário ${user}:`, row.listGroup); 
            resolve(NextResponse.json({ listGroup: JSON.parse(row.listGroup) })); 
          } else {
            resolve(NextResponse.json({ listGroup: [] })); 
          }
        }
      );
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 401 });
    } else if (error instanceof Error) {
      console.error('An error occurred:', error.message);
      return NextResponse.json({ error: 'Error fetching listGroup' }, { status: 500 });
    } else {
      console.error('An unknown error occurred:', error);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  const { listName, games, user } = await request.json();

  if (!listName || !games || !user) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, secretKey);
    const db = openDb();
    await new Promise<void>((resolve, reject) => {
      const listGroupString = JSON.stringify(games);
      db.run(
        'INSERT INTO userListGroups (user, listName, listGroup) VALUES (?, ?, ?)',
        [user, listName, listGroupString],
        (err) => {
          if (err) {
            console.error('Erro ao salvar a lista:', err.message);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    return NextResponse.json({ message: 'List created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}