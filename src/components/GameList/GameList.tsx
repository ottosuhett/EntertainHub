import React,{useContext, useEffect, useState} from 'react';
import { MainContext,UserListGroup,Game } from "@/app/context/MainContext";
import {Form, Button,Card,Dropdown,DropdownButton} from 'react-bootstrap';
import {handleOpenModal,handleCloseModal} from "@/app/functions/genericFunctions"
import styles from "./GameList.module.scss"
import ModalComp from '../ModalComp/ModalComp';
import { useRouter } from 'next/navigation';

export interface IGameListProps {
}

export default function GameList (props: IGameListProps) {
    const {gameList, setGameList,searchedGame,userList, setUserList,userListGroup,setUserListGroup,loggedUser,cachedGames, setCachedGames,totalUniqueGames,setTotalUniqueGames,setSelectedNavBar} = useContext(MainContext)

    const [newListName, setNewListName] = useState<string>('');
    const [openCreateListmodal, setOpenCreateListmodal ] = useState(false)
    const filteredGameList = gameList.filter((game) =>
        game.name.toLowerCase().includes(searchedGame.toLowerCase())
    );

    const listToRender = searchedGame.length > 0 ? filteredGameList : gameList
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [openShowMoreModal, setOpenShowMoreModal] = useState(false);
    const [gameAlreadyInList, setGameAlreadyInList] = useState<string | null>(null);
    const [openAlreadyExistsModal, setOpenAlreadyExistsModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
      const cached = localStorage.getItem('cachedGames');
      if (cached) {
        setCachedGames(JSON.parse(cached));
      }
    }, []);
    useEffect(() => {
      console.log("cachedGames atualizado:", cachedGames);
    }, [cachedGames]);

    const addGameToExistingList = async (listName: string, game: Game) => {
      // const previousUserListGroup = [...userListGroup];
      const targetList = userListGroup.find(group => group.listName === listName);
      if (targetList) {
        const gameExists = targetList.list.some(existingGame => existingGame.id === game.id);
        
        if (gameExists) {
          setGameAlreadyInList(listName); 
          setOpenAlreadyExistsModal(true); 
          return;
        }
  
        const updatedGroups = userListGroup.map((group) => {
          if (group.listName === listName) {
            return { ...group, list: [...group.list, game] };
          }
          return group;
        });
  
        setUserListGroup(updatedGroups);
        updateTotalUniqueGames(updatedGroups);
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Usuário não autenticado');
      
          const response = await fetch(`/api/list-group`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              listName,
              games: updatedGroups.find((group) => group.listName === listName)?.list,
              user: loggedUser,
            }),
          });
      
          if (!response.ok) throw new Error('Erro ao atualizar a lista no banco de dados');
      
          localStorage.setItem(`${loggedUser}_listGroup`, JSON.stringify(updatedGroups));
          router.push("/myList");
        } catch (error) {
          console.error('Erro ao adicionar o jogo na lista existente:', error);
        //   setUserListGroup(previousUserListGroup);
    
        // localStorage.setItem(`${loggedUser}_listGroup`, JSON.stringify(previousUserListGroup));
        }
      }
    };
    
  
    const createNewList = async (game: Game) => {
      const newGroup: UserListGroup = {
        listName: newListName,
        list: [game],
      };
    
      console.log('Creating new list:', newGroup);
    
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('Token is missing');
          throw new Error('Usuário não autenticado');
        }
    
        // Faz uma requisição POST para salvar a nova lista no banco de dados
        const response = await fetch(`/api/list-group`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ listName: newListName, games: [game], user: loggedUser }),
        });
    
        console.log('Response status:', response.status);
        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(`Erro ao salvar a lista no banco de dados: ${errorMsg}`);
        }
    
        setUserListGroup([...userListGroup, newGroup]);
        updateTotalUniqueGames([...userListGroup, newGroup]);
        const updatedUserListGroup = [...userListGroup, newGroup];
        localStorage.setItem(`${loggedUser}_listGroup`, JSON.stringify(updatedUserListGroup));
    
        // Limpa o nome da nova lista
        setNewListName('');
        console.log('List created successfully');
      } catch (error) {
        console.error('Erro ao criar a nova lista:', error);
      }
    };
    
    const handleShowMore = async (game: Game) => {
      if (cachedGames[game.id]) {
        setSelectedGame(cachedGames[game.id]);
        setOpenShowMoreModal(true);
        return;
      }
    
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      const gameDetailsUrl = `https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`;
      
      try {
        const response = await fetch(gameDetailsUrl);
        const gameDetails = await response.json();
        
        const gameWithDetails = { ...game, description: gameDetails.description_raw };
        const updatedCache = { ...cachedGames, [game.id]: gameWithDetails };
        
        setCachedGames(updatedCache);
        localStorage.setItem('cachedGames', JSON.stringify(updatedCache)); 
    
        setSelectedGame(gameWithDetails);
        setOpenShowMoreModal(true);
      } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
      }
    };
    
    const updateTotalUniqueGames = (updatedGroups: UserListGroup[]) => {
      const uniqueGames = new Set<number>();
      updatedGroups.forEach(group => {
        group.list.forEach(game => {
          uniqueGames.add(game.id);
        });
      });
      setTotalUniqueGames(uniqueGames.size);
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
                <Button className={styles.btn} onClick={() => handleShowMore(game)}>
                  <span className={styles.btnTxt}>Show more</span>
                </Button>
                  <DropdownButton
                    title="Add to list"
                    className={styles.btn} 
                  >
                    {userListGroup.map((group, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={async() =>{
                          await addGameToExistingList(group.listName, game)
                        }}
                      >
                        {group.listName}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => {
                        setSelectedGame(game);
                        handleOpenModal(setOpenCreateListmodal); 
                    }}>
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
        onConfirm={async () => {
          if (selectedGame) {
            await createNewList(selectedGame);
          }
          setOpenCreateListmodal(false);
          router.push("/myList");
          
        }}
        onCancel={()=>setNewListName("")}
        >
        <p className={styles.txt}>{newListName.length >0 ?`The list "${newListName}" will be created`:"List name"}</p>
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

      {/* Modal "Show More" */}
      {selectedGame && (
        <ModalComp
          title={selectedGame.name}
          state={openShowMoreModal}
          setState={setOpenShowMoreModal}
          confirmBtnTxt='Ok'
          closeBtnTxt='Close'
          onConfirm={()=>{handleCloseModal(setOpenShowMoreModal)}}

        >
          <Card.Img variant="top" src={selectedGame.background_image} className={styles.gameImg} />
          <p className={styles.gameName}>{selectedGame.name}</p>
          <p className={styles.description}>{selectedGame.description || 'No description available'}</p> 
        </ModalComp>
      )}

    {<ModalComp 
      title='Info' 
      state={openAlreadyExistsModal} 
      setState={setOpenAlreadyExistsModal}
      closeBtnTxt='Close' 
      >
        <p className={styles.txt}>
        The game is already on the list "{gameAlreadyInList}".
        </p>
    </ModalComp>
    }
      </div>
      
    );
  }

