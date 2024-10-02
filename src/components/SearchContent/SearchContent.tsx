import React ,{useContext,useEffect}from 'react';
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container,Row,Col,Card} from 'react-bootstrap';
import styles from "./SearchContent.module.scss"
import GameList from '../GameList/GameList';
import InputControl from '../InputControl/InputControl';
import { getGameList } from '@/app/functions/genericFunctions'; 

export interface ISearchContentProps {
}

export default function SearchContent (props: ISearchContentProps) {
    const {gameList,setGameList} = useContext(MainContext)

    const fetchGameList = async () => {
        if (gameList.length === 0) {
          const fetchedGames = await getGameList();
          setGameList(fetchedGames);
        }
      };

    useEffect(()=>{
        console.log("game list no search",gameList)
    },[gameList])
    useEffect(() => {
        fetchGameList();
      }, []);
  return (
    <Container fluid className={styles.mainContainer}>
        <div className={styles.inputContainer}>
            <InputControl placeholder="Search"/>
        </div>
        <div className={styles.GameListContainer}>
            <GameList />
        </div>
    </Container>
  );
}
