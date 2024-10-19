import React, { useContext, useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import styles from "./Ranking.module.scss";
import { getRanking } from '@/app/functions/genericFunctions'; 

export interface IRankingProps {}

export default function Ranking(props: IRankingProps) {
  const [topGames, setTopGames] = useState<any[]>([]);

  
  useEffect(() => {
    const fetchTopGames = async () => {
      if (topGames.length === 0) { 
        const games = await getRanking(); 
        setTopGames(games); 
      }
    };

    fetchTopGames(); 
  }, [topGames]);

  return (
    <Container className={styles.rankingContainer}>
      <p className={styles.title}>Top 10</p>
      {topGames.length > 0 ? (
        topGames.map((game) => (
          <Card key={game.id} className={styles.gameCard}>
            <Card.Body>
              <Card.Title className={styles.cardContent}>
                <span className={styles.info}>{game.name}</span>
                <div className={styles.ratingContainer}>
                    <span className={styles.infoRating}>{game.rating}/5</span>
                </div>
            </Card.Title>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading ranking...</p>
      )}
    </Container>
  );
}
