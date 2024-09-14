import React from 'react';
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container,Row,Col,Card} from 'react-bootstrap';
import styles from "./SearchContent.module.scss"
import GameList from '../GameList/GameList';
import InputControl from '../InputControl/InputControl';

export interface ISearchContentProps {
}

export default function SearchContent (props: ISearchContentProps) {
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
