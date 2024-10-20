import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'myVeryStrongSecretKey';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user'); 

  if (!user) {
    return NextResponse.json({ error: 'User is required' }, { status: 400 });
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, secretKey);

    // Corrigido para usar colunas em letras minúsculas
    const { data, error } = await supabase
      .from('userListGroups')
      .select('listname, listgroup')
      .eq('user', user);

    if (error) {
      console.error('Error fetching listGroup:', error.message);
      return NextResponse.json({ error: 'Error fetching listGroup' }, { status: 500 });
    }

    const lists = data.map((row: { listname: string; listgroup: string }) => ({
      listName: row.listname,
      list: JSON.parse(row.listgroup),
    }));

    return NextResponse.json({ listGroup: lists });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 401 });
    } else {
      console.error('An error occurred:', error);
      return NextResponse.json({ error: 'Error fetching listGroup' }, { status: 500 });
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

    const listGroupString = JSON.stringify(games);

    // Corrigido para usar colunas em letras minúsculas
    const { data, error } = await supabase
      .from('userListGroups')
      .insert([{ user, listname: listName, listgroup: listGroupString }]);

    if (error) {
      console.error('Erro ao salvar a lista:', error.message || error);
      return NextResponse.json({ error: 'Error saving list', details: error.message || error }, { status: 500 });
    }

    console.log('List inserted successfully:', data);

    return NextResponse.json({ message: 'List created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Error creating list' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
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

    const listGroupString = JSON.stringify(games);

    // Corrigido para usar colunas em letras minúsculas
    const { error } = await supabase
      .from('userListGroups')
      .update({ listgroup: listGroupString })
      .eq('user', user)
      .eq('listname', listName);

    if (error) {
      console.error('Erro ao atualizar a lista:', error.message || error);
      return NextResponse.json({ error: 'Error updating list', details: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ message: 'List updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Error updating list' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { listName, user } = await request.json();

  if (!listName || !user) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, secretKey);

    // Corrigido para usar colunas em letras minúsculas
    const { error } = await supabase
      .from('userListGroups')
      .delete()
      .eq('user', user)
      .eq('listname', listName);

    if (error) {
      console.error('Erro ao deletar a lista:', error.message || error);
      return NextResponse.json({ error: 'Error deleting list', details: error.message || error }, { status: 500 });
    }

    return NextResponse.json({ message: 'List deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao deletar a lista:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Error deleting list' }, { status: 500 });
  }
}
