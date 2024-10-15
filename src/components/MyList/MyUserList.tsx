"use client";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "@/app/context/MainContext";
import { Container, Card ,Button} from "react-bootstrap";
import styles from "./MyUserList.module.scss";
import { BsFolderX,BsFolder,BsFolder2Open,BsInfoSquare } from "react-icons/bs";
import TooltipComp from "../TooltipComp/TooltipComp";

export interface IMyUserListProps {}

export default function MyUserList(props: IMyUserListProps) {
  const { userListGroup, loggedUser, setUserListGroup } = useContext(MainContext);
  
  const [visibleLists, setVisibleLists] = useState<number[]>([]);

  const toggleListVisibility = (index: number) => {
    if (visibleLists.includes(index)) {
      setVisibleLists(visibleLists.filter(i => i !== index)); 
    } else {
      setVisibleLists([...visibleLists, index]);
    }
  };

  useEffect(() => {
    const savedListGroup = localStorage.getItem(`${loggedUser}_listGroup`);

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
                     <Button className={styles.btn}>
                      <span className={styles.btnTxt}>Details..</span>
                     </Button>
                      
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
    </Container>
  );
}
