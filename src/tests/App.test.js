import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente App.js', () => {
  test('Verifica se o link da página HOME funciona corretamente', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    expect(pathname).toBe('/');
  });

  test('Verifica se o link da página FAVORITES funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /favorite/i });
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Verifica se o link da página ABOUT funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Verifica se o link da página NOTFOUND funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bi-campeonato-do-atletico');
    const notFoundHeader = screen.getByRole('heading', { name: /not found/i });
    expect(notFoundHeader).toBeInTheDocument();
  });
});
