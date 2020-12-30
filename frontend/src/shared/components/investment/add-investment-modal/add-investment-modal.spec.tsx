import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import AddInvestmentModal from './add-investment-modal';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { SaveInvestmentRequestDto } from '../../../../core/api/api.types';
import {
  investmentResponseFactory,
  saveInvestmentRequestFactory,
} from '../../../../../test/factory/api/investment';

describe('AddInvestmentModal component', () => {
  const basketId = 1;

  const server = setupServer(
    rest.post<SaveInvestmentRequestDto>(
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

  function submitForm(form: SaveInvestmentRequestDto) {
    userEvent.type(
      screen.getByLabelText(/initial amount/i),
      `{selectall}${form.startAmount}`,
    );
    userEvent.type(
      screen.getByLabelText(/estimated annual rate of return/i),
      `{selectall}${form.annualInterestRate}`,
    );
    userEvent.type(
      screen.getByLabelText(/years of growth/i),
      `{selectall}${form.yearsOfGrowth}`,
    );
    userEvent.type(
      screen.getByLabelText(/additional payment/i),
      `{selectall}${form.payment}`,
    );
    userEvent.selectOptions(screen.getByLabelText(/category/i), form.category);
    userEvent.selectOptions(
      screen.getByLabelText(/payment frequency/i),
      String(form.paymentFrequency),
    );
    userEvent.selectOptions(
      screen.getByLabelText(/compound frequency/i),
      String(form.compoundFrequency),
    );
    userEvent.click(screen.getByRole('button', { name: /add/i }));
  }

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
    const formState = saveInvestmentRequestFactory.buildOne();
    const onAddMock = jest.fn();
    const { queryClient } = renderWithProviders(
      <AddInvestmentModal
        basketId={basketId}
        isOpen
        onClose={jest.fn()}
        onAdd={onAddMock}
      />,
    );

    submitForm(formState);

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /add/i })).not.toBeDisabled(),
    );
    expect(queryClient.getMutationCache().getAll()).toHaveLength(1);
    expect(onAddMock).toHaveBeenCalledTimes(1);
  });

  it('should display unexpected error when response has error status', async () => {
    server.use(
      rest.post(`/api/me/baskets/${basketId}/investments`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    renderWithProviders(
      <AddInvestmentModal basketId={basketId} isOpen onClose={jest.fn()} />,
    );

    submitForm(saveInvestmentRequestFactory.buildOne());

    await waitFor(() =>
      expect(
        screen.getByText(/unexpected error occurred/i),
      ).toBeInTheDocument(),
    );
  });

  it('should display form errors when response has 400 status code', async () => {
    server.use(
      rest.post(`/api/me/baskets/${basketId}/investments`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [
              {
                field: 'annualInterestRate',
                message: 'annual error',
              },
            ],
          }),
        );
      }),
    );
    renderWithProviders(
      <AddInvestmentModal basketId={basketId} isOpen onClose={jest.fn()} />,
    );

    submitForm(saveInvestmentRequestFactory.buildOne());

    await waitFor(() =>
      expect(screen.getByText(/annual error/i)).toBeInTheDocument(),
    );
  });
});
