import React, {useState,useContext, useEffect} from "react";
import styles from "./MainNavBar.module.scss"
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container} from 'react-bootstrap';

export interface IMainNavBarProps {
}

export default function MainNavBar (props: IMainNavBarProps) {
    return(
        <Container fluid className={styles.mainContainer}>
            
        </Container>
    )
}