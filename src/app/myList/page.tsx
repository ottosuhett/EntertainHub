"use client"
import React from 'react';
import styles from "./page.module.scss"
import MainNavBar from '@/components/MainNavBar/MainNavBar';

export interface IMyListProps {
}

export default function MyList (props: IMyListProps) {
  return (
    <div className={styles.mainContainer}>
      <MainNavBar />
    </div>
    
  )
}
