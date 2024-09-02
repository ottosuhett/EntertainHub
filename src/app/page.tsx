"use client";
import React, { useContext, useEffect } from 'react';
import styles from "./page.module.scss";
import { MainContext } from "./context/MainContext";
import LoginWindow from "@/components/Login/LoginWindow"
import LoggedWindow from '@/components/LoggedWindow/LoggedWindow';

export default function Home() {
  const { isLogged } = useContext(MainContext);

  return (
    <main className={styles.main}>
     {isLogged ? <LoggedWindow />: <LoginWindow />}
    </main>
  );
}
