"use client"
import React, { useEffect,useContext } from 'react';
import SearchContent from '@/components/SearchContent/SearchContent';
import styles from "./page.module.scss"
import MainNavBar from '@/components/MainNavBar/MainNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainContext } from '../context/MainContext';

export interface ISearchProps {
}
 
export default function Search (props: ISearchProps) {
  const {setSelectedNavBar} = useContext(MainContext)

  useEffect(()=>{
    setSelectedNavBar("Search")
   },[])
  return (
    <div className={styles.mainContainer}>
      <MainNavBar />
      <SearchContent />
    </div>
    
  )
}
