/**
 * Testes Cobertos no Arquivo de Teste:
 * 
 * 1. **Renderização do botão "Delete Profile":**
 *    - Verifica se o botão "Delete Profile" é renderizado corretamente quando há um usuário logado no contexto.
 *    - Usa o método `findByText` para assegurar que o botão aparece na tela.
 *
 * 2. **Exibição de informações do usuário e estatísticas de jogos:**
 *    - Garante que o nome do usuário logado (`loggedUser`) é exibido corretamente.
 *    - Valida que o número total de jogos únicos (`totalUniqueGames`) é exibido na interface.
 *    - Verifica se o número de listas do usuário (`listCount`) é mostrado corretamente.
 *
 * 3. **Estado de carregamento antes de carregar os dados do usuário:**
 *    - Confirma que o texto "Loading data..." aparece enquanto os dados do usuário estão sendo carregados.
 *    - Simula uma condição onde `loggedUser` está vazio para testar o estado de carregamento.
 *
 * 4. **Chamada da função `handleDeleteUser`:**
 *    - Simula o clique no botão "Delete Profile" para verificar se a função `handleDeleteUser` é chamada corretamente.
 *    - Confirma que a função `fetch` é acionada com os parâmetros esperados para excluir o usuário.
 *
 * 5. **Resiliência do componente a diferentes estados do contexto:**
 *    - Garante que o componente reage adequadamente a diferentes valores no contexto, incluindo:
 *      - Um usuário logado.
 *      - Ausência de usuário logado (simulado como uma string vazia ou contexto incompleto).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileInfoCard from './ProfileInfoCard';
import { MainContext } from '@/app/context/MainContext';


// Mock do contexto
const mockContextValue = {
  isLogged: true,
  setIsLogged: jest.fn(),
  user: 'testUser',
  setUser: jest.fn(),
  loggedUser: 'testUser',
  setLoggedUser: jest.fn(),
  userList: [],
  setUserList: jest.fn(),
  userListGroup: [],
  setUserListGroup: jest.fn(),
  totalUniqueGames: 5,
  setTotalUniqueGames: jest.fn(),
  gameList: [],
  setGameList: jest.fn(),
  searchedGame: '',
  setSearchedGame: jest.fn(),
  selectedNavBar: 'home',
  setSelectedNavBar: jest.fn(),
  listCount: 0,
  setListCount: jest.fn(),
  cachedGames: {},
  setCachedGames: jest.fn(),
};

describe('ProfileInfoCard Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ lists: [] }),
      } as Response)
    );
    localStorage.setItem('loggedUser', 'testUser');
    localStorage.setItem('token', 'fakeToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the Delete Profile button', async () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <ProfileInfoCard />
      </MainContext.Provider>
    );

    const button = await screen.findByText(/Delete Profile/i);
    expect(button).toBeInTheDocument();
  });

  it('displays user information and game stats correctly', async () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <ProfileInfoCard />
      </MainContext.Provider>
    );

    // Verifica se o nome do usuário está sendo exibido
    const userInfo = await screen.findByText(mockContextValue.loggedUser);
    expect(userInfo).toBeInTheDocument();


    // Verifica se o número total de jogos únicos está correto
    const uniqueGames = screen.getByText(mockContextValue.totalUniqueGames.toString());
    expect(uniqueGames).toBeInTheDocument();

    // Verifica se o número de listas é exibido (neste caso, 0)
    const listCount = screen.getByText(mockContextValue.listCount.toString());
    expect(listCount).toBeInTheDocument();
  });

  it('shows loading state before user data is loaded', () => {
    render(
      <MainContext.Provider value={{ ...mockContextValue, loggedUser: "" }}>
        <ProfileInfoCard />
      </MainContext.Provider>
    );

    const loadingText = screen.getByText(/Loading data.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it('calls handleDeleteUser when Delete Profile button is clicked', async () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <ProfileInfoCard />
      </MainContext.Provider>
    );

    const deleteButton = await screen.findByText(/Delete Profile/i);
    expect(deleteButton).toBeInTheDocument();

    // Simula o clique no botão
    deleteButton.click();

    // Verifica se o fetch foi chamado
    expect(global.fetch).toHaveBeenCalledWith('/api/delete-user', expect.anything());
  });
});
