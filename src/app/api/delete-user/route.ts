import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'myVeryStrongSecretKey';

export async function DELETE(request: NextRequest) {
  try {
    // Extrair e validar o token do header Authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
    }

    try {
      jwt.verify(token, secretKey); // Verificar o token JWT
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    // Extrair o username do corpo da requisição
    const { username } = await request.json();
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Deletar listas associadas ao usuário
    const { error: listError } = await supabase
      .from('userListGroups') // Nome da tabela
      .delete()
      .eq('user', username);

    if (listError) {
      console.error('Erro ao deletar listas do usuário:', listError);
      return NextResponse.json({ error: 'Erro ao deletar listas do usuário' }, { status: 500 });
    }

    // Deletar o usuário da tabela users
    const { error: userError } = await supabase
      .from('users') // Nome da tabela
      .delete()
      .eq('username', username);

    if (userError) {
      console.error('Erro ao deletar o usuário:', userError);
      return NextResponse.json({ error: 'Erro ao deletar o usuário' }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Usuário e suas listas deletados com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar a requisição DELETE:', error);
    return NextResponse.json({ error: 'Erro ao processar a requisição' }, { status: 500 });
  }
}
