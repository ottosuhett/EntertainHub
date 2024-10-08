"use client";
import React, { useContext,useEffect } from "react";
import { MainContext } from "@/app/context/MainContext";
import { Container, Carousel, Card } from 'react-bootstrap';
import styles from "./MyUserList.module.scss"

export interface IMyUserListProps {}

export default function MyUserList(props: IMyUserListProps) {
  const { userListGroup,loggedUser,setUserListGroup } = useContext(MainContext); 

  useEffect(() => {
    const savedListGroup = localStorage.getItem(`${loggedUser}_listGroup`);
  
    if (savedListGroup) {
      setUserListGroup(JSON.parse(savedListGroup)); 
    } else {
      const token = localStorage.getItem('token'); 
  
      fetch(`/api/list-group?user=${loggedUser}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Passo o token no cabeçalho Authorization
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
            localStorage.setItem(`${loggedUser}_listGroup`, JSON.stringify(data.listGroup));
          }
        })
        .catch((error) => {
          console.error('Erro ao carregar o listGroup:', error);
        });
    }
  }, [loggedUser, setUserListGroup]);
  

  return (
    <Container fluid className={styles.mainContainer}>
      {userListGroup.length > 0 ? (
        userListGroup.map((group, idx) => (
          <div key={idx} className={styles.listGroupContainer}>
            <h2 className={styles.listName}>{group.listName}</h2> 
            <Carousel className={styles.carousel}>
              {group.list.map((game) => (
                <Carousel.Item key={game.id}>
                  <Card className={styles.cardGame}>
                    <Card.Img
                      variant="top"
                      src={game.background_image}
                      className={styles.gameImg}
                    />
                    <Card.Body className={styles.cardBody}>
                      <Card.Title className={styles.gameName}>{game.name}</Card.Title>
                      <Card.Text>{game.released}</Card.Text> 
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ))
      ) : (
        <p className={styles.errorMsg}>Você ainda não tem listas</p>
      )}
    </Container>
  );
}
