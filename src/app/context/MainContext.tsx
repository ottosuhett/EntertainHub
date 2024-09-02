"use client";
import React from 'react';

export interface MainContextType {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user:string;
    setUser:React.Dispatch<React.SetStateAction<string>>,
    selectedNavBar:string,
    setSelectedNavBar:React.Dispatch<React.SetStateAction<string>>
}

export const MainContext = React.createContext<MainContextType>({
    isLogged: false,
    setIsLogged: () => {},
    user:"",
    setUser:()=>{},
    selectedNavBar:"",
    setSelectedNavBar: ()=>{}
});


