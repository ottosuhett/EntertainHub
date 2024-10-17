"use client";
import React from 'react';

export interface Game {
    id: number;
    name: string;
    released: string;
    background_image: string;
    rating: number;
    description?: string; 
    metacritic?:string;
    platforms?: { platform: { name: string } }[];
    progress?: number;
}
export interface UserListGroup {
    listName: string;
    list: Game[];
}
export interface MainContextType {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user:string;
    setUser:React.Dispatch<React.SetStateAction<string>>,
    selectedNavBar:string,
    setSelectedNavBar:React.Dispatch<React.SetStateAction<string>>
    gameList:Game[]
    setGameList:React.Dispatch<React.SetStateAction<Game[]>>
    searchedGame:string,
    setSearchedGame:React.Dispatch<React.SetStateAction<string>>
    loggedUser:string;
    setLoggedUser:React.Dispatch<React.SetStateAction<string>>
    userList:Game[],
    setUserList:React.Dispatch<React.SetStateAction<Game[]>>,
    userListGroup: UserListGroup[];
    setUserListGroup: React.Dispatch<React.SetStateAction<UserListGroup[]>>;
    listCount: number;
    setListCount: React.Dispatch<React.SetStateAction<number>>;
    cachedGames: { [key: number]: Game };
    setCachedGames: React.Dispatch<React.SetStateAction<{ [key: number]: Game }>>;
}

export const MainContext = React.createContext<MainContextType>({
    isLogged: false,
    setIsLogged: () => {},
    user:"",
    setUser:()=>{},
    selectedNavBar:"",
    setSelectedNavBar: ()=>{},
    gameList:[],
    setGameList:()=>{},
    searchedGame:"",
    setSearchedGame:()=>{},
    loggedUser:"",
    setLoggedUser:()=>{},
    userList:[],
    setUserList:()=>{},
    userListGroup: [],
    setUserListGroup: () => {},
    listCount:0,
    setListCount:()=>{},
    cachedGames:{},
    setCachedGames:()=>{}
});


