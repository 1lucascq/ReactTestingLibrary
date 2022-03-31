import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('Teste do componente App.js', () => {
  const POKEMON_CARDNAME = 'pokemon-name';
  test('Verifica se heading aparece corretamente', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />);
    const headingEl = screen.getByRole('heading', { name: /Encountered pokémons/i });

    expect(headingEl).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon da lista quando solicitado', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />);

    const nextPokeButtonEl = screen.getByRole('button', { name: /próximo pokémon/i });

    const displayedPokemon = screen.getByTestId(POKEMON_CARDNAME);
    expect(displayedPokemon.textContent).toBe('Pikachu');

    userEvent.click(nextPokeButtonEl);
    expect(displayedPokemon.textContent).toBe('Charmander');

    userEvent.click(nextPokeButtonEl);
    userEvent.click(nextPokeButtonEl);
    userEvent.click(nextPokeButtonEl);
    userEvent.click(nextPokeButtonEl);
    userEvent.click(nextPokeButtonEl);
    userEvent.click(nextPokeButtonEl);
    userEvent.click(nextPokeButtonEl);
    userEvent.click(nextPokeButtonEl);

    expect(displayedPokemon.textContent).toBe('Pikachu');
  });

  test('Verifica se é exibido apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />);

    const allTypesBtnEl = screen.getByRole('button', { name: /All/i });
    expect(allTypesBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).toBeVisible();

    const electricTypeBtnEl = screen.getByRole('button', { name: /electric/i });
    expect(electricTypeBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).toBeVisible();

    const fireTypeBtnEl = screen.getByRole('button', { name: /fire/i });
    expect(fireTypeBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).toBeVisible();

    const bugTypeBtnEl = screen.getByRole('button', { name: /bug/i });
    expect(bugTypeBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).toBeVisible();

    const PoisonTypeBtnEl = screen.getByRole('button', { name: /Poison/i });
    expect(PoisonTypeBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).toBeVisible();

    const PsychicTypeBtnEl = screen.getByRole('button', { name: /Psychic/i });
    expect(PsychicTypeBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).toBeVisible();

    const NormalTypeBtnEl = screen.getByRole('button', { name: /Normal/i });
    expect(NormalTypeBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).toBeVisible();

    const DragonTypeBtnEl = screen.getByRole('button', { name: /Dragon/i });
    expect(DragonTypeBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).toBeVisible();

    userEvent.click(electricTypeBtnEl);
    const displayedPokemon = screen.getByTestId(POKEMON_CARDNAME);
    const nextPokeButtonEl = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(displayedPokemon.textContent).toBe('Pikachu');
    expect(nextPokeButtonEl).toBeDisabled();

    const allTypes = screen.getAllByTestId('pokemon-type-button');
    const ALL_TYPES_LENGTH = 7;
    expect(allTypes).toHaveLength(ALL_TYPES_LENGTH);
  });

  test('Verifica se o botão ALL funciona corretamente', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />);

    const nextPokeButtonEl = screen.getByRole('button', { name: /próximo pokémon/i });
    const allTypesBtnEl = screen.getByRole('button', { name: /All/i });

    expect(allTypesBtnEl).toBeInTheDocument();
    expect(allTypesBtnEl).not.toBeDisabled();

    userEvent.click(allTypesBtnEl);

    const displayedPokemon = screen.getByTestId(POKEMON_CARDNAME);
    expect(displayedPokemon.textContent).toBe('Pikachu');

    userEvent.click(nextPokeButtonEl);
    expect(displayedPokemon.textContent).toBe('Charmander');

    userEvent.click(nextPokeButtonEl);
    expect(displayedPokemon.textContent).toBe('Caterpie');

    userEvent.click(nextPokeButtonEl);
    expect(displayedPokemon.textContent).toBe('Ekans');
  });
});
