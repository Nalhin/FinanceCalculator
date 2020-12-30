import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import InvestmentItem from './investment-item';
import { investmentResponseFactory } from '../../../../../test/factory/api/investment';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('InvestmentItem', () => {
  it('should call onDelete with investmentId after delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    const providedInvestment = investmentResponseFactory.buildOne({ id: 1 });
    renderWithProviders(
      <InvestmentItem
        basketId={1}
        onEdit={jest.fn()}
        onDelete={onDeleteMock}
        investment={providedInvestment}
      />,
    );

    userEvent.click(screen.getByLabelText(/delete/i));

    expect(onDeleteMock).toBeCalledTimes(1);
    expect(onDeleteMock).toBeCalledWith(1);
  });

  it('should call onEdit with investmentId after edit button is clicked', () => {
    const onEditMock = jest.fn();
    const providedInvestment = investmentResponseFactory.buildOne({ id: 1 });
    renderWithProviders(
      <InvestmentItem
        basketId={1}
        onEdit={onEditMock}
        onDelete={jest.fn()}
        investment={providedInvestment}
      />,
    );

    userEvent.click(screen.getByLabelText(/edit/i));

    expect(onEditMock).toBeCalledTimes(1);
    expect(onEditMock).toBeCalledWith(1);
  });

  it('should display investment category', () => {
    const providedInvestment = investmentResponseFactory.buildOne({
      category: 'CERTIFICATE_OF_DEPOSIT',
    });
    renderWithProviders(
      <InvestmentItem
        basketId={1}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        investment={providedInvestment}
      />,
    );

    expect(screen.getByText(/certificate of deposit/i)).toBeInTheDocument();
  });
});
