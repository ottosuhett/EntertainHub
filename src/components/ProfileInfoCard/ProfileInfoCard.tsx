import React,{useState,useContext, useEffect} from 'react';
import { Container,Button } from 'react-bootstrap';
import styles from "./ProfileInfoCard.module.scss"
import { MainContext } from '@/app/context/MainContext';
import { BsBroadcast } from "react-icons/bs";
import Image from 'next/image';

export interface IProfileInfoCardProps {
}

export default function ProfileInfoCard (props: IProfileInfoCardProps) {
    const { loggedUser, userListGroup, setUserListGroup } = useContext(MainContext);
    const [listCount, setListCount] = useState(0);

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
          } catch (error) {
            console.error('Erro ao buscar listas do BD, tentando pegar do localStorage:', error);
    
            const storedListGroup = localStorage.getItem(`${loggedUser}_listGroup`);
            if (storedListGroup) {
              const lists = JSON.parse(storedListGroup);
              setUserListGroup(lists);
              setListCount(lists.length);
            } else {
              console.error('Nenhuma lista encontrada no localStorage.');
            }
          }
        };
    
        if (loggedUser) {
          fetchUserLists();
        }
      }, [loggedUser, setUserListGroup]);

  return (
    <Container fluid className={styles.mainContainer}>
        {
            loggedUser ?
            <>
                <div className={styles.header}>
                    <Image 
                    width={30}
                    height={30}
                    alt="userAvatar"
                    src="/images/logo.png" 
                    className={styles.userAvatar}  
                    />
                    <span className={styles.infoTxt}>{loggedUser}</span>
                    
                    <BsBroadcast className={styles.statusIcon}/>
                    
                </div>
                <div className={styles.body}>
                    <p className={styles.label}>
                    List: <span className={styles.infoTxt}>{listCount}</span>
                    </p>
                    <p className={styles.label}> 
                        Games: <span className={styles.infoTxt}>10</span>
                    </p>
                </div>
                <div className={styles.btnContainer}>
                    <Button className={styles.btn}> Edit Profile</Button>
                </div>
            </>
            
            :
            null
        }   
    </Container>
    
  );
}
