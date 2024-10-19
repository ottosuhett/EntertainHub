"use client"
import React,{useState,useEffect,useContext} from 'react';
import { MainContext } from '@/app/context/MainContext';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import styles from "./HomePage.module.scss"
import { getGameList } from '@/app/functions/genericFunctions';
import Image from 'next/image';
import ProfileInfoCard from '../ProfileInfoCard/ProfileInfoCard';
import Ranking from '../Ranking/Ranking';
export interface IHomePageProps {
}

export default function HomePage (props: IHomePageProps) {
    const {gameList,setGameList} = useContext(MainContext)
    const [index, setIndex] = useState(0);
  
    const gifUrl = "https://media.giphy.com/media/3lIgOk4Gjfptu/giphy.gif"
    const gifUrl2 ="https://media.giphy.com/media/ViyksHC9lWPXov0kKM/giphy.gif"
    const fetchGameList = async () => {
        if(gameList.length === 0){
            const fetchedGames = await getGameList();
            setGameList(fetchedGames);
        }
        
    };
    useEffect(() => {
        fetchGameList();
    }, []);
    useEffect(()=>{
        console.log("No home",gameList)
    },[gameList])
    
    const handleSelect = (index:number) => {
        setIndex(index);
      };
      
      return (
        <Container fluid className={styles.mainContainer}>
          <div className={styles.header}>
            <p className={styles.title}>Welcome to EntertainHub</p>
          </div>

          {gameList.length > 0 && (
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {gameList.map((game, idx) => (
                <Carousel.Item key={idx} className={styles.itemContainer}>
                  <Image
                    height={400}
                    width={750}
                    src={game.background_image}
                    alt={`Slide game image ${game.name}`}
                    className={styles.gameImg}
                  />
                  <Carousel.Caption>
                    <h3 className={styles.gameName}>{game.name}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          
          <div className={styles.profileRankingContainer}>
            <div>
              <Ranking />
            </div>
            <div className={styles.profileCardContainer}>
              <ProfileInfoCard />
              <div>
                <img src={gifUrl} alt="Giphy Gif" style={{ width: "400px", height: 'auto' }} />
              </div>
            </div>
          </div>
        </Container>
      );
    }
