"use client";

import React, { useState, ReactNode } from 'react';
import { MainContext, Game ,UserListGroup} from './MainContext';


export const MainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState("")
  const [selectedNavBar,setSelectedNavBar] = useState("Home")
  const [gameList, setGameList] = useState<Game[]>([]);
  const [searchedGame, setSearchedGame]=useState("")
  const [loggedUser,setLoggedUser] = useState("")
  const [userList, setUserList] = useState<Game[]>([])
  const [userListGroup,setUserListGroup] = useState<UserListGroup[]>([])
  const [listCount,setListCount] =useState<number>(0)
  const [cachedGames, setCachedGames] = useState<{ [key: number]: Game }>({});
  const [totalUniqueGames,setTotalUniqueGames] = useState<number>(0)

  return (
    <MainContext.Provider value={{isLogged, setIsLogged,user, setUser,selectedNavBar,setSelectedNavBar,gameList, setGameList,searchedGame, setSearchedGame,loggedUser,setLoggedUser,userList, setUserList, userListGroup,setUserListGroup,listCount,setListCount,cachedGames, setCachedGames,totalUniqueGames,setTotalUniqueGames}}>
      {children}
    </MainContext.Provider>
  );
};