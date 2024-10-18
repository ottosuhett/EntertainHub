"use client"
import React, {useState,useContext, useEffect} from "react";
import styles from "./MainNavBar.module.scss"
import { MainContext } from "@/app/context/MainContext";
import {Form, Button,Container,Nav,Navbar} from 'react-bootstrap';
import Image from "next/image";
import Link from "next/link";
import { BsDoorOpen } from "react-icons/bs";
import { useRouter } from 'next/navigation';

export interface IMainNavBarProps {
}

export default function MainNavBar (props: IMainNavBarProps) {
    const {selectedNavBar,setSelectedNavBar,isLogged,setIsLogged,setLoggedUser} = useContext(MainContext)

    const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const savedUser = localStorage.getItem('loggedUser') || '';
    if (!token) {
      setIsLogged(false);
      router.push('/');
    }else{
        setIsLogged(true);
        setLoggedUser(savedUser);
    }
  }, [router,setIsLogged,setLoggedUser]);
  
    const handleLogout = () => {
        setIsLogged(false);
        setLoggedUser(''); 
        setSelectedNavBar("Home")
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');
        router.push('/');
    };
    return(
        <>
            { isLogged ?
            <Navbar  className={`${styles.NavBar} bg-transparent`}>
                <Container fluid className={styles.mainContainer}>
                    <div className={styles.mainNavBrand}>
                    <Link href="/home" className={styles.navLinkNoStyle} onClick={()=>setSelectedNavBar("Home")}>
                        <Image
                        alt=""
                        src="/images/logo.png"
                        width="100"
                        height="100"
                        className={styles.logo}
                        />{' '}
                        <Navbar.Brand className={styles.brandTitle}>Entertainhub</Navbar.Brand>
                    </Link>
                    </div>
                    <Nav className={styles.navItemsDiv}>
                        <Link 
                        className={`${selectedNavBar === "Home" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        href="/home"
                        onClick={()=>setSelectedNavBar("Home")}
                        >
                            Home
                        </Link>
                       
                        <Link className={`${selectedNavBar === "Search" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        href="/search"
                        onClick={()=>setSelectedNavBar("Search")}
                        >
                            Search
                        </Link>
                        <Link className={`${selectedNavBar === "MyList" ? styles.selectedNav:styles.unselectedNav} ${styles.navLinkITem}`}
                        href="/myList"
                        onClick={()=>setSelectedNavBar("MyList")}
                        >
                            MyList
                        </Link>
                        <Nav.Item 
                        className={styles.logoutContainer}
                        onClick={handleLogout}
                        >
                            <BsDoorOpen 
                            className={styles.doorIcon}
                            />
                            <p className={styles.logout}>Logout</p>
                        </Nav.Item>
                   
                    </Nav>
                </Container>
            </Navbar>:null
        
    }
    </>
    )
    
}