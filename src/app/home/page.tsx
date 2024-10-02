"use client"
import React,{useEffect} from 'react';
import HomePage from '@/components/Home/HomePage';
import styles from "./page.module.scss"
import MainNavBar from '@/components/MainNavBar/MainNavBar';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';


export interface IHomeProps {
}

export default function Home (props: IHomeProps) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token'); // Verifica se o token ta n localStorage
    if (!token) {
      // Se não tem token jogo pra pagina de login
      router.push('/');
    }
  }, [router]);
  return (
    <div className={styles.mainContainer}>
      <MainNavBar />
      <HomePage />
    </div>
    
  )
}
