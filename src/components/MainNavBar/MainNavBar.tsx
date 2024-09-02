import React, {useState,useContext, useEffect} from "react";
import styles from "./MainNavBar.module.scss"
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container,Nav,Navbar} from 'react-bootstrap';
import Image from "next/image";
export interface IMainNavBarProps {
}

export default function MainNavBar (props: IMainNavBarProps) {
    const {selectedNavBar,setSelectedNavBar} = useContext(MainContext)
    return(
       
            <Navbar bg="dark" data-bs-theme="dark">
                <Container fluid className={styles.mainContainer}>
                    <div className={styles.mainNavBrand}>
                        <Image
                        alt=""
                        src="/images/logo.png"
                        width="100"
                        height="100"
                        //className="d-inline-block align-top"
                        className={styles.logo}
                        />{' '}
                        <Navbar.Brand className={styles.brandTitle}>Entertainhub</Navbar.Brand>
                    </div>
                    <Nav className={styles.navItemsDiv}>
                        <Nav.Link 
                        className={`${selectedNavBar === "Home" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        onClick={()=>setSelectedNavBar("Home")}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link className={`${selectedNavBar === "Search" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        onClick={()=>setSelectedNavBar("Search")}
                        >
                            Search
                        </Nav.Link>
                        <Nav.Link className={`${selectedNavBar === "MyList" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        onClick={()=>setSelectedNavBar("MyList")}
                        >
                            MyList
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        
    )
}