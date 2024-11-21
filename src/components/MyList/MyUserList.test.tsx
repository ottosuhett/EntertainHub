/**
 * Este arquivo contém os testes para o componente `MyUserList`:
 *
 * - **Renderização sem listas:**
 *   Verifica se, quando o usuário não possui listas (`userListGroup` vazio),
 *   a mensagem "Você ainda não tem listas" é exibida corretamente.
 *
 * - **Exibição do título principal:**
 *   Verifica se o título principal "Your Lists" é exibido corretamente, 
 *   independentemente de o usuário possuir listas ou não.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import MyUserList from "./MyUserList";
import { MainContext, MainContextType } from "@/app/context/MainContext";

// Mock do contexto
const mockContextValue: MainContextType = {
  isLogged: true,
  setIsLogged: jest.fn(),
  user: "testUser",
  setUser: jest.fn(),
  selectedNavBar: "myList",
  setSelectedNavBar: jest.fn(),
  gameList: [],
  setGameList: jest.fn(),
  searchedGame: "",
  setSearchedGame: jest.fn(),
  loggedUser: "testUser",
  setLoggedUser: jest.fn(),
  userList: [],
  setUserList: jest.fn(),
  userListGroup: [],
  setUserListGroup: jest.fn(),
  listCount: 0,
  setListCount: jest.fn(),
  cachedGames: {},
  setCachedGames: jest.fn(),
  totalUniqueGames: 0,
  setTotalUniqueGames: jest.fn(),
};

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe("MyUserList Component", () => {
  it('renders "no lists" message when userListGroup is empty', () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <MyUserList />
      </MainContext.Provider>
    );

    expect(screen.getByText(/Você ainda não tem listas/i)).toBeInTheDocument();
  });
});
describe("MyUserList Component", () => {
    it('renders the main title "Your Lists"', () => {
      render(
        <MainContext.Provider value={mockContextValue}>
          <MyUserList />
        </MainContext.Provider>
      );
  
      expect(screen.getByText(/Your Lists/i)).toBeInTheDocument();
    });
  });
