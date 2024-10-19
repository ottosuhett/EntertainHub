import { NextRequest, NextResponse } from "next/server";
import { openDb } from "../../lib/db"; 

export async function POST(request: NextRequest) {
  const { user, gameId, progress } = await request.json();

  if (!user || !gameId || progress === undefined) {
    return NextResponse.json({ error: "Parâmetros inválidos." }, { status: 400 });
  }

  const db = openDb();

  try {
    // Verifica se já existe uma entrada para o progresso desse usuário e jogo
    const existingProgress = await new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM user_games WHERE username = ? AND game_id = ?",
        [user, gameId],
        (err, row) => {
          if (err) reject(err);
          resolve(row); 
        }
      );
    });

    if (existingProgress) {
      await new Promise((resolve, reject) => {
        db.run(
          "UPDATE user_games SET progress = ? WHERE username = ? AND game_id = ?",
          [progress, user, gameId],
          (err) => {
            if (err) reject(err);
            resolve(null);
          }
        );
      });
    } else {
      await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO user_games (username, game_id, progress) VALUES (?, ?, ?)",
          [user, gameId, progress],
          (err) => {
            if (err) reject(err);
            resolve(null);
          }
        );
      });
    }

    return NextResponse.json({ message: "Progresso atualizado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar o progresso:", error);
    return NextResponse.json({ error: "Erro ao atualizar o progresso." }, { status: 500 });
  } finally {
    db.close(); 
  }
}
