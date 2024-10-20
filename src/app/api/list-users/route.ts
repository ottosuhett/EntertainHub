import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'myVeryStrongSecretKey';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, secretKey);

    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error.message);
      return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }

    // Retorna a lista de user
    console.log('Users in database:', data);
    return NextResponse.json({ users: data });

  } catch (error) {
    // Verifica se o erro é uma instância de jwt.JsonWebTokenError
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
