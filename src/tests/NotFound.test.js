import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Teste do componente App.js', () => {
  test('Verifica se heading aparece corretamente', () => {
    renderWithRouter(<NotFound />);
    const headingEl = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(headingEl).toBeInTheDocument();
  });

  test('Verifica se a imagem aparece na tela corretamente', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img', { name: /pikachu crying/i });
    const { src } = img;

    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
