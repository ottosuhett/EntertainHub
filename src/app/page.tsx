"use client";
import React, { useContext, useEffect } from 'react';
import styles from "./page.module.scss";
import { MainContext } from "./context/MainContext";
import LoginWindow from "@/app/components/Login/LoginWindow"


export default function Home() {
  const { name, setName } = useContext(MainContext);

  useEffect(()=>{
    setName("EntertainHub")
  },[])
  return (
    <main className={styles.main}>
     <LoginWindow />
    </main>
  );
}
