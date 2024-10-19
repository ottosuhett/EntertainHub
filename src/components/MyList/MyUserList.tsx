"use client";
import React, { useContext, useEffect, useState } from "react";
import { MainContext, Game } from "@/app/context/MainContext";
import { Container, Card ,Button} from "react-bootstrap";
import styles from "./MyUserList.module.scss";
import { BsFolderX,BsFolder,BsFolder2Open } from "react-icons/bs";
import TooltipComp from "../TooltipComp/TooltipComp";
import ModalComp from "../ModalComp/ModalComp";

export interface IMyUserListProps {}

export default function MyUserList(props: IMyUserListProps) {
  const { userListGroup, loggedUser, setUserListGroup ,cachedGames,setCachedGames} = useContext(MainContext);
  
  const [visibleLists, setVisibleLists] = useState<number[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [openShowMoreModal, setOpenShowMoreModal] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [gameProgress, setGameProgress] = useState<{ [gameId: number]: number }>({});

  const maxDescriptionLength = 150;
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const toggleListVisibility = (index: number) => {
    if (visibleLists.includes(index)) {
      setVisibleLists(visibleLists.filter(i => i !== index)); 
    } else {
      setVisibleLists([...visibleLists, index]);
    }
  };

  useEffect(() => {
    const fetchProgressFromDB = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const response = await fetch(`/api/get-progress?user=${loggedUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Erro ao carregar o progresso do banco de dados.");
        }
  
        const data = await response.json();
  
        // Atualiza o progresso local com os dados do banco de dados
        const savedGameProgress: { [key: number]: number } = {};
        data.progress.forEach((progressItem: { gameId: number; progress: number }) => {
          savedGameProgress[progressItem.gameId] = progressItem.progress;
        });
  
        setGameProgress(savedGameProgress);
      } catch (error) {
        console.error("Erro ao carregar o progresso do banco de dados:", error);
      }
    };
  
    fetchProgressFromDB();
  }, [loggedUser]);
  
  useEffect(() => {
    const savedListGroup = localStorage.getItem(`${loggedUser}_listGroup`);
    const savedGameProgress: { [key: number]: number } = {};
  
    userListGroup.forEach(group => {
      group.list.forEach(game => {
        const userProgressKey = `${loggedUser}_gameProgress_${game.id}`;
        const savedProgress = localStorage.getItem(userProgressKey);

        if (savedProgress) {
          savedGameProgress[game.id] = JSON.parse(savedProgress);
        }
      });
    });
  
    setGameProgress(savedGameProgress);
  
    if (savedListGroup) {
      setUserListGroup(JSON.parse(savedListGroup));
    } else {
      const token = localStorage.getItem("token");
      fetch(`/api/list-group?user=${loggedUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.listGroup) {
          setUserListGroup(data.listGroup);
          localStorage.setItem(
            `${loggedUser}_listGroup`,
            JSON.stringify(data.listGroup)
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar o listGroup:", error);
      });
    }
  }, [loggedUser, setUserListGroup]);

  const handleShowDetails = async (game: Game) => {
    const cachedGame = cachedGames[game.id];
  
    const userProgressKey = `${loggedUser}_gameProgress_${game.id}`;
    const savedProgress = localStorage.getItem(userProgressKey);
    const progress = savedProgress ? JSON.parse(savedProgress) : 0;
  
    if (cachedGame) {
      setSelectedGame({ ...cachedGame, progress });
      setOpenShowMoreModal(true);
      return;
    }
  
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const gameDetailsUrl = `https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`;
    
    try {
      const response = await fetch(gameDetailsUrl);
      const gameDetails = await response.json();
  
      const gameWithDetails = { ...game, description: gameDetails.description_raw, progress };
  
      const updatedCache = { ...cachedGames, [game.id]: gameWithDetails };
      setCachedGames(updatedCache);
      localStorage.setItem('cachedGames', JSON.stringify(updatedCache));
  
      setSelectedGame(gameWithDetails);
      setOpenShowMoreModal(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes do jogo:', error);
    }
  };
  
  const handleProgressChange = (gameId: number, newProgress: number) => {
    setGameProgress((prevProgress) => ({
      ...prevProgress,
      [gameId]: newProgress,
    }));
    
    const userProgressKey = `${loggedUser}_gameProgress_${gameId}`;
    localStorage.setItem(userProgressKey, JSON.stringify(newProgress));
    updateProgressGameDB(gameId,newProgress)
    if (selectedGame && selectedGame.id === gameId) {
      setSelectedGame((prevGame) => {
        if (prevGame) {
          return {
            ...prevGame,
            progress: newProgress,
          };
        }
        return prevGame;
      });
    }
  };
  
  const updateProgressGameDB = async(gameId: number, newProgress: number) =>{
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/update-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: loggedUser,
          gameId: gameId,
          progress: newProgress,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar o progresso no banco de dados.");
      }
  
      const data = await response.json();
      console.log("Progresso atualizado no banco de dados:", data);
    } catch (error) {
      console.error("Erro ao salvar o progresso:", error);
    }
  }
  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <p className={styles.mainTitle}>Your Lists</p> 
        <TooltipComp hoverMsg="To open a list click on one of them"/>
      </div>
      
      {userListGroup.length > 0 ? (
        userListGroup.map((group, idx) => (
          <div key={idx} className={styles.listGroupContainer}>
            <div className={styles.listHeaderContainer} onClick={() => toggleListVisibility(idx)}>
              {visibleLists.includes(idx) ?<BsFolder2Open className={styles.closeFolderIcon}/>:<BsFolder className={styles.openFolderIcon}/>}
              <h2 className={styles.listName}>
                {group.listName}
              </h2>
            </div>

            {visibleLists.includes(idx) && (
              <div className={styles.gameListContainer}>
                {group.list.map((game) => (
                  <Card className={styles.cardGame} key={game.id}>
                    <Card.Img
                      variant="top"
                      src={game.background_image}
                      className={styles.gameImg}
                    />
                    <Card.Body className={styles.cardBody}>
                      <span>
                        <Card.Title className={styles.gameName}>
                          {game.name}
                        </Card.Title>
                        <Card.Text className={styles.rating}>Rating:{game.rating}</Card.Text>
                      </span>
                      <span className={styles.rightContainer}>
                          <div className={styles.progressBtnContainer}>
                              <strong className={styles.progressLabel}>Progress: </strong>   
                              <p className={styles.gameProgressTxt}>
                              {gameProgress[game.id] !== undefined ? gameProgress[game.id] : game.progress || "0"}%
                              </p>
                          </div>
                          <Button 
                          className={styles.btn}
                          onClick={() => handleShowDetails(game)}
                          >
                            <span className={styles.btnTxt}>Details..</span>
                          </Button>
                        
                     </span>
                      
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className={styles.noListContainer}>
          <BsFolderX />
          <p className={styles.errorMsg}>Você ainda não tem listas</p>
        </div>
        
      )}
      {selectedGame && (
        <ModalComp
        title={selectedGame.name}
        state={openShowMoreModal}
        setState={setOpenShowMoreModal}
        confirmBtnTxt='Ok'
        closeBtnTxt='Close'
        onConfirm={() => setOpenShowMoreModal(false)}
      >
        <Card.Img variant="top" src={selectedGame.background_image} className={styles.gameImgCard} />
        <p className={styles.gameName}>{selectedGame.name}</p>
    
        <p className={styles.description}>
          {showFullDescription
            ? selectedGame.description
            : `${selectedGame.description?.slice(0, maxDescriptionLength)}...`}
          {selectedGame.description && selectedGame.description.length > 150 && (
            <Button variant="link" className={styles.showMoreBtn} onClick={handleToggleDescription}>
              {showFullDescription ? 'Show less' : 'Show more'}
            </Button>
          )}
        </p>
      
        <p>
          <strong className={styles.labelInfo}>Released:</strong> 
          <span className={styles.gameInfo}>{selectedGame.released}</span>
        </p>
        <p>
          <strong className={styles.labelInfo}>Metacritic Score:</strong> <span className={styles.gameInfo}>{selectedGame.metacritic || 'Not available'}</span>
        </p>
      
        {selectedGame.platforms && selectedGame.platforms.length > 0 && (
          <p>
            <strong className={styles.labelInfo}>Available on:</strong> 
            {selectedGame.platforms.map((platformObj, idx) => (
              <span key={idx} className={styles.gameInfoPlataforms}>
                {platformObj.platform.name}
                {idx < (selectedGame.platforms?.length || 0) - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}
        <p className={styles.gameInfo}>
          <strong className={styles.labelInfo}>Rating:</strong>
          <span className={styles.gameInfo}>{selectedGame.rating}</span>
        </p>
        <div className={styles.progressContainer}>
          <label htmlFor="progressSlider">
          <strong className={styles.labelInfo}>Game Progress:</strong> 
          <span className={styles.gameInfo}>{selectedGame.progress || 0}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={selectedGame?.progress || gameProgress[selectedGame?.id] || 0}
            onChange={(e) => handleProgressChange(selectedGame?.id, parseInt(e.target.value))}
          />
      </div>
      </ModalComp>
  
      )}
    </Container>
  );
}
