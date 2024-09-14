import React, {useState,useContext, useEffect} from "react";
import styles from "./LoggedWindow.module.scss"
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container,Row,Col,Card} from 'react-bootstrap';
import MainNavBar from "@/components/MainNavBar/MainNavBar"
import { getGameList } from "@/app/functions/genericFunctions";
import Image from "next/image";
import GameList from "../GameList/GameList";
import InputControl from "../InputControl/InputControl";
import SearchContent from "../SearchContent/SearchContent";

export interface ILoggedWindowProps {
}

export default function LoggedWindow (props: ILoggedWindowProps) {
    const {selectedNavBar,setSelectedNavBar,gameList, setGameList} = useContext(MainContext)
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    
    const fetchGameList = async () => {
        if(gameList.length === 0){
            const fetchedGames = await getGameList();
            setGameList(fetchedGames);
        }
        
    };

    useEffect(() => {
        fetchGameList();
    }, []);
      
    return(
        <Container fluid className={styles.mainContainer}>
            <MainNavBar />
            {selectedNavBar === "Search" &&
                <SearchContent />
            }  
        </Container>
    )
}
