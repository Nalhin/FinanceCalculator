import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import AddInvestmentModal from './add-investment-modal';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { SaveInvestmentDto } from '../../../../core/api/api.interface';
import {
  investmentResponseFactory,
  saveInvestmentRequestFactory,
} from '../../../../../test/factory/api/investment';

describe('AddInvestmentModal component', () => {
  const basketId = 1;

  const server = setupServer(
    rest.post<SaveInvestmentDto>(
      `/api/me/baskets/${basketId}/investments`,
      (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json(investmentResponseFactory.buildOne(req.body)),
        );
      },
    ),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should hide modal when isOpen is false', () => {
    renderWithProviders(
      <AddInvestmentModal
        basketId={basketId}
        isOpen={false}
        onClose={jest.fn()}
      />,
    );

    expect(screen.queryByText(/add an investment/i)).not.toBeInTheDocument();
  });

  it('should hide modal after cancel button is clicked', () => {
    const onClose = jest.fn();
    renderWithProviders(
      <AddInvestmentModal basketId={basketId} isOpen onClose={onClose} />,
    );

    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should allow to add investment when form is valid', async () => {
    const expectedFormValues = saveInvestmentRequestFactory.buildOne();
    const { queryClient } = renderWithProviders(
      <AddInvestmentModal basketId={basketId} isOpen onClose={jest.fn()} />,
    );

    userEvent.type(
      screen.getByLabelText(/initial amount/i),
      `{selectall}${expectedFormValues.startAmount}`,
    );
    userEvent.type(
      screen.getByLabelText(/estimated annual rate of return/i),
      `{selectall}${expectedFormValues.annualInterestRate}`,
    );
    userEvent.type(
      screen.getByLabelText(/years of growth/i),
      `{selectall}${expectedFormValues.yearsOfGrowth}`,
    );
    userEvent.type(
      screen.getByLabelText(/additional payment/i),
      `{selectall}${expectedFormValues.payment}`,
    );
    userEvent.type(
      screen.getByLabelText(/risk level/i),
      `${expectedFormValues.risk}`,
    );
    userEvent.type(
      screen.getByLabelText(/category/i),
      `${expectedFormValues.category}`,
    );
    userEvent.selectOptions(
      screen.getByLabelText(/payment frequency/i),
      String(expectedFormValues.paymentFrequency),
    );
    userEvent.selectOptions(
      screen.getByLabelText(/compound frequency/i),
      String(expectedFormValues.compoundFrequency),
    );
    const button = screen.getByRole('button', { name: /add/i });
    userEvent.click(button);

    await waitFor(() => expect(button).not.toBeDisabled());
    expect(queryClient.getMutationCache().getAll()).toHaveLength(1);
  });
});
