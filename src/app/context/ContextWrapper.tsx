"use client";

import React, { useState, ReactNode } from 'react';
import { MainContext, MainContextType } from './MainContext';


export const MainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState("");


  return (
    <MainContext.Provider value={{name,setName}}>
      {children}
    </MainContext.Provider>
  );
};