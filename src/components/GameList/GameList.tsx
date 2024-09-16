import React,{useContext, useEffect, useState} from 'react';
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container,Row,Col,Card} from 'react-bootstrap';
import { getGameList } from "@/app/functions/genericFunctions";
import styles from "./GameList.module.scss"
export interface IGameListProps {
}

export default function GameList (props: IGameListProps) {
    const {gameList, setGameList,searchedGame} = useContext(MainContext)
    
    const fetchGameList = async () => {
        if(gameList.length === 0){
            const fetchedGames = await getGameList();
            setGameList(fetchedGames);
        }
        
    };

    useEffect(() => {
        fetchGameList();
    }, []);

    const filteredGameList = gameList.filter((game) =>
        game.name.toLowerCase().includes(searchedGame.toLowerCase())
    );

    const listToRender = searchedGame.length > 0 ? filteredGameList : gameList
    
  return (
    <div className={styles.gameList}>
        {gameList.length > 0 ? (
          listToRender.map((game) => (
              <Card className={styles.cardGame}>
                <Card.Img 
                variant="top" 
                src={game.background_image} 
                className={styles.gameImg}
                />
                <Card.Body className={styles.cardBody}>
                    <Card.Title className={styles.gameName}>{game.name}</Card.Title>
                    <Card.Text>
                    {game.id}
                    </Card.Text>
                    <Button variant="primary">Show More</Button>
                </Card.Body>
            </Card>
          ))
        ) : (
          <p>Carregando jogos...</p>
        )}
      </div>
  );
}
