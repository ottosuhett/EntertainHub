import React,{useContext, useEffect, useState} from 'react';
import { MainContext,UserListGroup,Game } from "@/app/context/MainContext";
import {Form, Button,Card,Dropdown,DropdownButton} from 'react-bootstrap';
import {handleOpenModal} from "@/app/functions/genericFunctions"
import styles from "./GameList.module.scss"
import ModalComp from '../ModalComp/ModalComp';

export interface IGameListProps {
}

export default function GameList (props: IGameListProps) {
    const {gameList, setGameList,searchedGame,userList, setUserList,userListGroup,setUserListGroup} = useContext(MainContext)

    const [newListName, setNewListName] = useState<string>('');
    const [openCreateListmodal, setOpenCreateListmodal ] = useState(false)
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
                    <Dropdown.Item onClick={() => handleOpenModal(setOpenCreateListmodal)}>
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
        {<ModalComp 
        title='Create List' 
        state={openCreateListmodal} 
        setState={setOpenCreateListmodal}
        confirmBtnTxt='Create'
        closeBtnTxt='Cancel'
        >
        <p className={styles.txt}>{newListName}</p>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.labelTxt}>List name</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Digite o nome da lista" 
            onChange={(e)=>setNewListName(e.target.value)}
            />
          </Form.Group>
        </Form>

      </ModalComp>}
      </div>
      
    );
  }

