import { NextRequest, NextResponse } from "next/server";
import { supabase } from '../../lib/supabase'; 

export async function POST(request: NextRequest) {
  const { user, gameId, progress } = await request.json();

  if (!user || !gameId || progress === undefined) {
    return NextResponse.json({ error: "Parâmetros inválidos." }, { status: 400 });
  }

  try {
    // Verifica se já existe uma entrada para o progresso desse usuário e jogo no Supabase
    const { data: existingProgress, error: fetchError } = await supabase
      .from('user_games')
      .select('*')
      .eq('username', user)
      .eq('game_id', gameId)
      .single(); 
    
    if (fetchError && fetchError.code !== 'PGRST116') {  // PGRST116 significa que a entrada não foi encontrada
      console.error('Erro ao buscar progresso existente:', fetchError.message);
      return NextResponse.json({ error: 'Erro ao buscar progresso.' }, { status: 500 });
    }

    if (existingProgress) {
      const { error: updateError } = await supabase
        .from('user_games')
        .update({ progress })
        .eq('username', user)
        .eq('game_id', gameId);

      if (updateError) {
        console.error('Erro ao atualizar progresso:', updateError.message);
        return NextResponse.json({ error: 'Erro ao atualizar progresso.' }, { status: 500 });
      }
    } else {
      const { error: insertError } = await supabase
        .from('user_games')
        .insert([{ username: user, game_id: gameId, progress }]);

      if (insertError) {
        console.error('Erro ao inserir progresso:', insertError.message);
        return NextResponse.json({ error: 'Erro ao inserir progresso.' }, { status: 500 });
      }
    }

    return NextResponse.json({ message: "Progresso atualizado com sucesso!" }, { status: 200 });

  } catch (error) {
    console.error("Erro ao atualizar o progresso:", error);
    return NextResponse.json({ error: "Erro ao atualizar o progresso." }, { status: 500 });
  }
}
