import { useRouter } from "next/router";

const isTokenExpired = (token: string) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiry = payload.exp * 1000; 
  return Date.now() >= expiry;
};
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const router = useRouter();

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token'); 
    router.push('/login'); 
    return;
  }

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}), 
  };

  const response = await fetch(url, {
    ...options,
    headers: authHeaders, 
  });

  return response;
};

  export const handleOpenModal=(setState:React.Dispatch<React.SetStateAction<boolean>>)=>{
  setState(true)
  }
  export const handleCloseModal=(setState:React.Dispatch<React.SetStateAction<boolean>>)=>{
    setState(false)
    }
  // getGameList
  const getGameList = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=16`;
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar jogos');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Erro ao buscar os jogos:', error);
      return [];
    }
  };
  
export {getGameList}