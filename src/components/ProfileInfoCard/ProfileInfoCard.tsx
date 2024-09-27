import React,{useState,useContext, useEffect} from 'react';
import { Container,Button } from 'react-bootstrap';
import styles from "./ProfileInfoCard.module.scss"
import { MainContext } from '@/app/context/MainContext';
import Image from 'next/image';

export interface IProfileInfoCardProps {
}

export default function ProfileInfoCard (props: IProfileInfoCardProps) {
    const {loggedUser} =useContext(MainContext)

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
                    {/** WIP- Lembrar de colocar o icon verde de online talvez um dropdown para selecionar o status */}
                    <p className={styles.label} >Status</p>
                </div>
                <div className={styles.body}>
                    <p className={styles.label}>List: 
                        <span className={styles.infoTxt}>3</span>
                    </p>
                    <p className={styles.label}> Games: 
                        <span className={styles.infoTxt}>10</span>
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
