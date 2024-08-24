"use client";
import React from 'react';

export interface MainContextType {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

export const MainContext = React.createContext<MainContextType>({
    name: "",
    setName: () => {}
});


