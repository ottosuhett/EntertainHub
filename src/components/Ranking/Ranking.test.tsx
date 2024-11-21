/**
 * Testes do Componente `Ranking`
 * 
 * 1. **Renderização inicial com estado de carregamento:**
 *    - Verifica se o texto "Loading ranking..." é exibido enquanto os dados do ranking ainda estão sendo carregados.
 *    - Simula um retorno inicial vazio de `getRanking`.
 *
 * 2. **Exibição dos jogos quando os dados são carregados:**
 *    - Mocka a função `getRanking` para retornar uma lista de jogos simulada.
 *    - Verifica se os nomes dos jogos e suas respectivas avaliações são renderizados corretamente no componente.
 *    - Aguarda a execução do `useEffect` para garantir que os dados foram carregados e atualizados no estado.
 *
 * 3. **Comportamento com dados vazios:**
 *    - Simula a função `getRanking` retornando uma lista vazia.
 *    - Verifica se o texto "Loading ranking..." continua sendo exibido quando não há jogos disponíveis.
 *    - Garante que o componente não tenta renderizar jogos inexistentes no estado vazio.
 * 
 * **Metodologias Utilizadas:**
 * - Mock da função `getRanking` utilizando `jest.mock`.
 * - Uso de `waitFor` para lidar com atualizações assíncronas do estado causadas pelo `useEffect`.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Ranking from './Ranking';
import { getRanking } from '@/app/functions/genericFunctions';

// Mock da função `getRanking`
jest.mock('@/app/functions/genericFunctions', () => ({
  getRanking: jest.fn(),
}));

describe('Ranking Component', () => {
  const mockGames = [
    { id: 1, name: 'Game 1', rating: 4.5 },
    { id: 2, name: 'Game 2', rating: 4.8 },
    { id: 3, name: 'Game 3', rating: 4.2 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading text initially', () => {
    (getRanking as jest.Mock).mockResolvedValueOnce([]);
    render(<Ranking />);
    expect(screen.getByText(/Loading ranking.../i)).toBeInTheDocument();
  });

  it('displays top games when data is loaded', async () => {
    (getRanking as jest.Mock).mockResolvedValueOnce(mockGames);

    render(<Ranking />);

    // Aguarda a resolução do `useEffect`
    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
      expect(screen.getByText('Game 2')).toBeInTheDocument();
      expect(screen.getByText('Game 3')).toBeInTheDocument();
    });

    // Verifica se as avaliações estão sendo exibidas
    expect(screen.getByText('4.5/5')).toBeInTheDocument();
    expect(screen.getByText('4.8/5')).toBeInTheDocument();
    expect(screen.getByText('4.2/5')).toBeInTheDocument();
  });

  it('handles empty ranking data gracefully', async () => {
    (getRanking as jest.Mock).mockResolvedValueOnce([]);

    render(<Ranking />);

    // Aguarda a resolução do `useEffect`
    await waitFor(() => {
      expect(screen.getByText(/Loading ranking.../i)).toBeInTheDocument();
    });

    expect(screen.queryByText('Game 1')).not.toBeInTheDocument();
  });
});
