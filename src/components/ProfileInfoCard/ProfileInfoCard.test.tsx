import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileInfoCard from './ProfileInfoCard';
import { MainContext } from '@/app/context/MainContext';

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
});
