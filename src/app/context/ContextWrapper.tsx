"use client";

import React, { useState, ReactNode } from 'react';
import { MainContext, Game } from './MainContext';


export const MainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState("")
  const [selectedNavBar,setSelectedNavBar] = useState("Home")
  const [gameList, setGameList] = useState<Game[]>([]);
  const [searchedGame, setSearchedGame]=useState("")

  return (
    <MainContext.Provider value={{isLogged, setIsLogged,user, setUser,selectedNavBar,setSelectedNavBar,gameList, setGameList,searchedGame, setSearchedGame}}>
      {children}
    </MainContext.Provider>
  );
};