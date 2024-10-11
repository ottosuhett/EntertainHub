"use client";
import React, { useContext, useEffect } from 'react';
import styles from "./page.module.scss";
import { MainContext } from "./context/MainContext";
import LoginWindow from "@/components/Login/LoginWindow"
import LoggedWindow from '@/components/LoggedWindow/LoggedWindow';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isLogged } = useContext(MainContext);
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      router.push('/home');
    }
  }, [isLogged, router]);

  return (
    <main className={styles.main}>
     {<LoginWindow />}
    </main>
  );
}
