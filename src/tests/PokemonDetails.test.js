import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste do componente App.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailsEl = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsEl);
  });

  test('Verifica se o card do pokemon aparece corretamente', () => {
    const pokemonNameEl = screen.getByTestId('pokemon-name');
    const pokemonTypeEl = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const {
      summary,
      type,
      name,
      averageWeight: { value, measurementUnit },
    } = pokemons[0];
    const imgEl = screen.getByRole('img', { name: `${name} sprite` });
    const { src } = imgEl;
    const headingNameEl = screen.getByRole('heading', {
      name: `${name} Details`,
    });
    const headingSummaryEl = screen.getByRole('heading', { name: 'Summary' });
    const summaryParagraphEl = screen.getByText(summary);

    expect(headingNameEl).toBeInTheDocument();
    expect(headingSummaryEl).toBeInTheDocument();
    expect(pokemonNameEl).toBeInTheDocument();
    expect(summaryParagraphEl).toBeInTheDocument();
    expect(pokemonTypeEl).toBeInTheDocument();
    expect(pokemonWeight.textContent).toBe(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(pokemonTypeEl.textContent).toBe(type);
    expect(src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('Verifica os mapas com a localização dos pokémons', () => {
    const {
      foundAt,
      name,
    } = pokemons[0];

    const locationEl = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locationEl).toBeInTheDocument();

    const mapsEl = screen.getAllByRole('img', { name: `${name} location` });
    expect(mapsEl).toHaveLength(foundAt.length);

    const firstLocEl = screen.getByText(foundAt[0].location);
    const secondLocEl = screen.getByText(foundAt[1].location);
    expect(firstLocEl).toBeInTheDocument();
    expect(secondLocEl).toBeInTheDocument();
    expect(mapsEl[0].src).toBe(foundAt[0].map);
    expect(mapsEl[1].src).toBe(foundAt[1].map);
  });

  test('Verifica o funcionamento do botão de favoritar um pokémon', () => {
    const { name } = pokemons[0];
    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favCheckbox);

    const favIcon = screen.getByRole('img', { name: `${name} is marked as favorite` });
    const { src } = favIcon;

    expect(favIcon).toBeInTheDocument();
    expect(src).toBe('http://localhost/star-icon.svg');

    userEvent.click(favCheckbox);
    expect(favIcon).not.toBeInTheDocument();
  });
});
