import React,{useState,useContext, useEffect} from 'react';
import { Container,Button } from 'react-bootstrap';
import styles from "./ProfileInfoCard.module.scss"
import { MainContext,UserListGroup } from '@/app/context/MainContext';
import { BsBroadcast } from "react-icons/bs";
import Image from 'next/image';

export interface IProfileInfoCardProps {
}

export default function ProfileInfoCard (props: IProfileInfoCardProps) {
    const { loggedUser, userListGroup, setUserListGroup, totalUniqueGames ,setTotalUniqueGames} = useContext(MainContext);
    const [listCount, setListCount] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchUserLists = async () => {
          try {
              const response = await fetch('/api/list-group');
              if (!response.ok) {
                  throw new Error('Erro ao buscar listas do BD');
              }
              const data = await response.json();
              setUserListGroup(data.lists);
              setListCount(data.lists.length);
              localStorage.setItem(`${loggedUser}_listGroup`, JSON.stringify(data.lists));
              updateTotalUniqueGames(data.lists); 
          } catch (error) {
              console.error('Erro ao buscar listas do BD, tentando pegar do localStorage:', error);
  
              const storedListGroup = localStorage.getItem(`${loggedUser}_listGroup`);
              if (storedListGroup) {
                  const lists = JSON.parse(storedListGroup);
                  setUserListGroup(lists);
                  setListCount(lists.length);
                  updateTotalUniqueGames(lists); 
              } else {
                setUserListGroup([]);
                setListCount(0);
                console.error('Nenhuma lista encontrada no localStorage.');
              }
          }finally{
            setIsLoading(false); 
          }
      };
  
      if (loggedUser) {
        setUserListGroup([]);
        setListCount(0);
        setTotalUniqueGames(0);
          fetchUserLists();
      }
  }, [loggedUser, setUserListGroup,setTotalUniqueGames]);

    const updateTotalUniqueGames = (lists: UserListGroup[]) => {
      const uniqueGames = new Set<number>();
      
      lists.forEach(group => {
          group.list.forEach(game => {
              uniqueGames.add(game.id); 
          });
      });

      setTotalUniqueGames(uniqueGames.size);
  };
  if (isLoading) {
    return <p>Loading data...</p>; 
  }
  return (
    <Container fluid className={styles.mainContainer}>
        {
            loggedUser ?
            <>
                <div className={styles.header}>
                    <Image 
                    width={50}
                    height={50}
                    alt="userAvatar"
                    src="/images/logo.png" 
                    className={styles.userAvatar}  
                    />
                    <span className={styles.infoTxt}>{loggedUser}</span>
                    
                    <BsBroadcast className={styles.statusIcon}/>
                    
                </div>
                <div className={styles.body}>
                    <p className={styles.labelContainer}>
                    <div className={styles.label}>List: </div> 
                    <span className={styles.number}>{listCount}</span>
                    </p>
                    <p className={styles.labelContainer}> 
                        <div className={styles.label}>Games: </div>
                        <span className={styles.number}>{totalUniqueGames}</span>
                    </p>
                </div>
                {/* <div className={styles.btnContainer}>
                    <Button className={styles.btn}> Edit Profile</Button>
                </div> */}
            </>
            
            :
            null
        }   
    </Container>
    
  );
}
