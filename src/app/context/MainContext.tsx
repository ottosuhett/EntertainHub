"use client";
import React from 'react';

export interface Game {
    id: number;
    name: string;
    released: string;
    background_image: string;
    rating: number;
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
}

export const MainContext = React.createContext<MainContextType>({
    isLogged: false,
    setIsLogged: () => {},
    user:"",
    setUser:()=>{},
    selectedNavBar:"",
    setSelectedNavBar: ()=>{},
    gameList:[],
    setGameList:()=>{}
});


