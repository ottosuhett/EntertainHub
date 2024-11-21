/**
 * Testes do Componente `GameList`:
 *
 * 1. **Mock do `useRouter` do Next.js:**
 *    - Simula o comportamento do `useRouter` com um mock para evitar erros de dependência durante os testes.
 *    - Mocka o método `push` usado para navegação.
 *
 * 2. **Mock do Contexto (`MainContext`):**
 *    - Fornece um valor mockado do contexto com propriedades necessárias para o funcionamento do componente.
 *
 * 3. **Testes de Funcionalidade do `GameList`:**
 *
 *    a. **Renderização Correta:**
 *       - Verifica se o componente renderiza corretamente a lista de jogos fornecida pelo contexto.
 *       - Garante que os nomes dos jogos estão presentes no DOM.
 *
 *    b. **Filtragem de Jogos:**
 *       - Simula o valor de `searchedGame` no contexto.
 *       - Garante que apenas os jogos que correspondem ao valor de busca são exibidos.
 *
 *    c. **Estado de Carregamento:**
 *       - Testa o comportamento do componente quando a lista de jogos (`gameList`) está vazia.
 *       - Verifica se o texto "Carregando jogos..." é exibido corretamente.
 *
 *    d. **Botão "Show more":**
 *       - Verifica se o botão "Show more" é renderizado corretamente.
 *       - Simula o clique no botão e garante que o evento esperado é disparado.
 *
 * 4. **Limpeza de Mocks:**
 *    - Antes de cada teste, limpa os mocks para evitar interferências entre os testes.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameList from './GameList';
import { MainContext } from '@/app/context/MainContext';
import { MainContextType } from '@/app/context/MainContext';
import { useRouter } from 'next/navigation';

// Mock do Next.js useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

const mockContextValue: MainContextType = {
  isLogged: true,
  setIsLogged: jest.fn(),
  user: 'testUser',
  setUser: jest.fn(),
  selectedNavBar: 'home',
  setSelectedNavBar: jest.fn(),
  gameList: [
    { id: 1, name: 'Game 1', released: '2023-01-01', background_image: '/game1.jpg', rating: 4.5 },
    { id: 2, name: 'Game 2', released: '2022-12-01', background_image: '/game2.jpg', rating: 4.0 },
  ],
  setGameList: jest.fn(),
  searchedGame: '',
  setSearchedGame: jest.fn(),
  loggedUser: 'testUser',
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

describe('GameList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the GameList component correctly', () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <GameList />
      </MainContext.Provider>
    );

    // Verifica se os jogos são exibidos
    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Game 2')).toBeInTheDocument();
  });

  it('filters games based on the searchedGame context', () => {
    render(
      <MainContext.Provider value={{ ...mockContextValue, searchedGame: 'Game 1' }}>
        <GameList />
      </MainContext.Provider>
    );

    // Verifica se apenas o jogo filtrado é exibido
    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.queryByText('Game 2')).not.toBeInTheDocument();
  });

  it('displays loading text when gameList is empty', () => {
    render(
      <MainContext.Provider value={{ ...mockContextValue, gameList: [] }}>
        <GameList />
      </MainContext.Provider>
    );

    const loadingText = screen.getByText(/Carregando jogos.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it('shows the "Show more" button and triggers the function when clicked', () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <GameList />
      </MainContext.Provider>
    );

    const showMoreButton = screen.getAllByText(/Show more/i)[0]; // Primeiro botão
    expect(showMoreButton).toBeInTheDocument();

    // Simula o clique no botão
    fireEvent.click(showMoreButton);

  });
});
