/**
 * Testes do componente `SearchContent`:
 * 
 * 1. **Renderização básica**:
 *    - Verifica se o componente `SearchContent` é renderizado sem erros.
 * 
 * 2. **Componente interno `GameList`**:
 *    - Certifica-se de que o componente `GameList` é renderizado corretamente
 *      com base nos dados fornecidos pelo contexto.
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainContext } from '@/app/context/MainContext';
import { MainContextType } from '@/app/context/MainContext';
import SearchContent from './SearchContent';
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

describe('SearchContent Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <SearchContent />
      </MainContext.Provider>
    );

    // Verifica se o componente foi renderizado corretamente
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders the GameList component', () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <SearchContent />
      </MainContext.Provider>
    );

    // Verifica se os jogos da GameList são exibidos
    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Game 2')).toBeInTheDocument();
  });
});
