"use client";
import React, { useContext, useEffect } from 'react';
import styles from "./page.module.css";
import { MainContext } from "./context/MainContext";

export default function Home() {
  const { name, setName } = useContext(MainContext);

  useEffect(()=>{
    setName("EntertainHub")
  },[])
  return (
    <main className={styles.main}>
      <h1>{name}</h1>
    </main>
  );
}
