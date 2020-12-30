import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import InvestmentDetailsTable from './investment-details-table';
import { investmentResponseFactory } from '../../../../../test/factory/api/investment';
import { screen } from '@testing-library/react';

describe('InvestmentDetailsTable', () => {
  it('should display investment details in tabular form', () => {
    const providedInvestment = investmentResponseFactory.buildOne({
      risk: 'HIGH',
      category: 'CERTIFICATE_OF_DEPOSIT',
      payment: 100,
      startAmount: 150,
    });
    renderWithProviders(
      <InvestmentDetailsTable investment={providedInvestment} />,
    );

    expect(
      screen.getByText(`${providedInvestment.payment}$`),
    ).toBeInTheDocument();
    expect(screen.getByText(/high risk/i)).toBeInTheDocument();
    expect(screen.getByText(/certificate of deposit/i)).toBeInTheDocument();
  });
});
