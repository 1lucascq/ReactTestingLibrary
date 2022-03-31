import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

describe('Teste do componente App.js', () => {
  test('Verifica se o card do pokemon aparece corretamente', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isPokemonFavoriteById={ [] } />);
    const pokemonNameEl = screen.getByTestId('pokemon-name');
    const pokemonTypeEl = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { type, name, averageWeight: { value, measurementUnit } } = pokemons[0];
    const imgEl = screen.getByRole('img', { name: `${name} sprite` });
    const { src } = imgEl;

    expect(pokemonNameEl).toBeInTheDocument();
    expect(pokemonTypeEl).toBeInTheDocument();
    expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonTypeEl.textContent).toBe(type);
    expect(src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica se card possui o link de naveção para mais detalhes', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isPokemonFavoriteById={ [] }
    />);
    const { id } = pokemons[0];
    const moreDetailsEl = screen.getByRole('link', { name: 'More details' });

    expect(moreDetailsEl).toBeInTheDocument();
    expect(moreDetailsEl.href).toBe(`http://localhost/pokemons/${id}`);

    userEvent.click(moreDetailsEl);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
  test('Verifica o redirecionamento ao clicar em Mais Detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsEl = screen.getByRole('link', { name: 'More details' });
    const { id, name } = pokemons[0];

    userEvent.click(moreDetailsEl);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favCheckbox);

    const favIcon = screen.getByRole('img', { name: `${name} is marked as favorite` });
    const { src } = favIcon;
    expect(favIcon).toBeInTheDocument();
    expect(src).toBe('http://localhost/star-icon.svg');
  });
});
