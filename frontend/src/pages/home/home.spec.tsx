import * as React from 'react';
import { renderWithProviders } from '../../../test/render/render-with-providers';
import Home from './home';
import { screen } from '@testing-library/react';

describe('Home page', () => {
  it('should render header', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText(/invest with ease!/i)).toBeInTheDocument();
  });
});
