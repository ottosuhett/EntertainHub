"use client"
import React,{useEffect, useContext} from 'react';
import styles from "./page.module.scss"
import MainNavBar from '@/components/MainNavBar/MainNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyUserList from '@/components/MyList/MyUserList';
import { MainContext } from '../context/MainContext';
export interface IMyListProps {
}

export default function MyListPage (props: IMyListProps) {
  const {setSelectedNavBar} = useContext(MainContext)
  useEffect(()=>{
    setSelectedNavBar("MyList")
    },[])
  
  return (
    <div className={styles.mainContainer}>
      <MainNavBar />
      <MyUserList />
    </div>
    
  )
}
