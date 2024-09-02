import React, {useState,useContext, useEffect} from "react";
import styles from "./LoggedWindow.module.scss"
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container} from 'react-bootstrap';

export interface ILoggedWindowProps {
}

export default function LoggedWindow (props: ILoggedWindowProps) {
    const {isLogged,setIsLogged} = useContext(MainContext)

    return(
        <Container fluid className={styles.mainContainer}>

        </Container>
    )
}
