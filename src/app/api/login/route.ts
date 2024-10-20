import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../../../app/lib/supabase';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const secretKey = process.env.JWT_SECRET || 'myVeryStrongSecretKey';

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    // Busca o usuário na tabela "users"
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single(); 

    if (error || !data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: data.id, username: data.username }, secretKey, {
      expiresIn: '3h',
    });

    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('An error occurred during login:', error);
    return NextResponse.json({ error: 'Error during login' }, { status: 500 });
  }
}
