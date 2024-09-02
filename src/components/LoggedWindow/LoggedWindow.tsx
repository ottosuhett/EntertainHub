import React, {useState,useContext, useEffect} from "react";
import styles from "./LoggedWindow.module.scss"
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container} from 'react-bootstrap';
import MainNavBar from "@/components/MainNavBar/MainNavBar"
export interface ILoggedWindowProps {
}

export default function LoggedWindow (props: ILoggedWindowProps) {
    const {selectedNavBar,setSelectedNavBar} = useContext(MainContext)
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    

    return(
        <Container fluid className={styles.mainContainer}>
            <MainNavBar />
        </Container>
    )
}
