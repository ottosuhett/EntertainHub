"use client"
import React from 'react';
import SearchContent from '@/components/SearchContent/SearchContent';
import styles from "./page.module.scss"
import MainNavBar from '@/components/MainNavBar/MainNavBar';

export interface ISearchProps {
}

export default function Search (props: ISearchProps) {
  return (
    <div className={styles.mainContainer}>
      <MainNavBar />
      <SearchContent />
    </div>
    
  )
}