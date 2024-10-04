import React,{useContext, useEffect, useState} from 'react';
import { MainContext,UserListGroup,Game } from "@/app/context/MainContext";
import {Form, Button,Container,Row,Col,Card,Dropdown,DropdownButton} from 'react-bootstrap';
import { getGameList } from "@/app/functions/genericFunctions";
import ButtonComp from '../Btns/ButtonComp';
import styles from "./GameList.module.scss"
export interface IGameListProps {
}

export default function GameList (props: IGameListProps) {
    const {gameList, setGameList,searchedGame,userList, setUserList,userListGroup,setUserListGroup} = useContext(MainContext)

    const [newListName, setNewListName] = useState<string>('');

    const filteredGameList = gameList.filter((game) =>
        game.name.toLowerCase().includes(searchedGame.toLowerCase())
    );

    const listToRender = searchedGame.length > 0 ? filteredGameList : gameList
    
    const addGameToExistingList = (listName: string, game: Game) => {
      const updatedGroups = userListGroup.map((group) => {
        if (group.listName === listName) {
          return { ...group, list: [...group.list, game] };
        }
        return group;
      });
      setUserListGroup(updatedGroups);
    };
  
    // Função para criar uma nova lista com o jogo
    const createNewList = (game: Game) => {
      const newGroup: UserListGroup = {
        listName: newListName,
        list: [game],
      };
      setUserListGroup([...userListGroup, newGroup]);
      setNewListName('');
    };
  
  
    return (
      <div className={listToRender.length < 9 ? styles.shortList : styles.gameList}>
        {gameList.length > 0 ? (
          listToRender.map((game) => (
            <Card className={styles.cardGame} key={game.id}>
              <Card.Img
                variant="top"
                src={game.background_image}
                className={styles.gameImg}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.gameName}>{game.name}</Card.Title>
                <Card.Text>{game.id}</Card.Text>
                <div className={styles.btnContainer}>
                <Button className={styles.btn}>
                  <span className={styles.btnTxt}>Show more</span>
                </Button>
                  <DropdownButton
                    title="Add to list"
                    className={styles.btn} 
                  >
                    {userListGroup.map((group, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={() => addGameToExistingList(group.listName, game)}
                      >
                        {group.listName}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => createNewList(game)}>
                      Create new list
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Carregando jogos...</p>
        )}
      </div>
    );
  }

