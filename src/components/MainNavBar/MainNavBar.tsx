"use client"
import React, {useState,useContext, useEffect} from "react";
import styles from "./MainNavBar.module.scss"
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container,Nav,Navbar} from 'react-bootstrap';
import Image from "next/image";
import Link from "next/link";
export interface IMainNavBarProps {
}

export default function MainNavBar (props: IMainNavBarProps) {
    const {selectedNavBar,setSelectedNavBar,isLogged} = useContext(MainContext)
    return(
        <>
            { isLogged ?
            <Navbar  className={`${styles.NavBar} bg-transparent`}>
                <Container fluid className={styles.mainContainer}>
                    <div className={styles.mainNavBrand}>
                        <Image
                        alt=""
                        src="/images/logo.png"
                        width="100"
                        height="100"
                        className={styles.logo}
                        />{' '}
                        <Navbar.Brand className={styles.brandTitle}>Entertainhub</Navbar.Brand>
                    </div>
                    <Nav className={styles.navItemsDiv}>
                        <Link 
                        className={`${selectedNavBar === "Home" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        href="/home"
                        >
                            Home
                        </Link>
                       
                        <Link className={`${selectedNavBar === "Search" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        href="/search"
                        >
                            Search
                        </Link>
                        <Link className={`${selectedNavBar === "MyList" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        href="/myList"
                        >
                            MyList
                        </Link>
                    </Nav>
                </Container>
            </Navbar>:null
        
    }
    </>
    )
    
}