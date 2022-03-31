import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Teste do componente App.js', () => {
  test('Verifica se a página ABOUT carrega corretamente', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /about pokédex/i });

    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Verifica se a imagem aparece na tela corretamente', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img', { name: /pokédex/i });
    const { src } = img;

    expect(src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('Verifica se existem dois parágrados sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });
});
