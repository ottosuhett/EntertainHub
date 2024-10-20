import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { supabase } from '../../../app/lib/supabase';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    // Hash da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o usuário na tabela users com a senha criptografada
    const { error } = await supabase
      .from('users')
      .insert([{ username, password: hashedPassword }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}
