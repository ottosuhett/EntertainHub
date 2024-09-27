"use client"
import React from 'react';
import HomePage from '@/components/Home/HomePage';
import styles from "./page.module.scss"
import MainNavBar from '@/components/MainNavBar/MainNavBar';

export interface IHomeProps {
}

export default function Home (props: IHomeProps) {
  return (
    <div className={styles.mainContainer}>
      <MainNavBar />
      <HomePage />
    </div>
    
  )
}
