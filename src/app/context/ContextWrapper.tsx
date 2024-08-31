"use client";

import React, { useState, ReactNode } from 'react';
import { MainContext, MainContextType } from './MainContext';


export const MainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState("")


  return (
    <MainContext.Provider value={{isLogged, setIsLogged,user, setUser}}>
      {children}
    </MainContext.Provider>
  );
};