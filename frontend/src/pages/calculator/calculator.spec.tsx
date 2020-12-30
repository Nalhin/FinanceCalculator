import React from 'react';
import { renderWithProviders } from '../../../test/render/render-with-providers';
import { screen } from '@testing-library/react';
import Calculator from './calculator';

describe('Calculator page', () => {
  it('should display investment charts', () => {
    renderWithProviders(<Calculator />);

    expect(screen.getByText(/summary/i)).toBeInTheDocument();
    expect(screen.getAllByText(/total interest/i)).toHaveLength(2);
    expect(screen.getByText(/yearly interest/i)).toBeInTheDocument();
    expect(screen.getByText(/total payments/i)).toBeInTheDocument();
    expect(screen.getByText(/yearly payments/i)).toBeInTheDocument();
  });
});
