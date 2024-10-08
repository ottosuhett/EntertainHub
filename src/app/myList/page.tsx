"use client"
import React from 'react';
import styles from "./page.module.scss"
import MainNavBar from '@/components/MainNavBar/MainNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyUserList from '@/components/MyList/MyUserList';
export interface IMyListProps {
}

export default function MyListPage (props: IMyListProps) {
  return (
    <div className={styles.mainContainer}>
      <MainNavBar />
      <MyUserList />
    </div>
    
  )
}
