import React from 'react';
import { renderWithProviders } from '../../../test/render/render-with-providers';
import { screen } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound page', () => {
  it('should display not found info', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
