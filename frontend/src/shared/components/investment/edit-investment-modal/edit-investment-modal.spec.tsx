import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { UpdateInvestmentRequestDto } from '../../../../core/api/api.types';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { axios } from '../../../../core/api/axios';
import React from 'react';
import {
  investmentResponseFactory,
  updateInvestmentRequestFactory,
} from '../../../../../test/factory/api/investment';
import EditInvestmentModal from './edit-investment-modal';

describe('EditInvestmentModal', () => {
  const investmentId = 1;
  const basketId = 1;

  const server = setupServer(
    rest.put<UpdateInvestmentRequestDto>(
      `/api/me/baskets/${basketId}/investments/${investmentId}`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(
            investmentResponseFactory.buildOne({
              id: basketId,
              ...req.body,
            }),
          ),
        );
      },
    ),
  );

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());

  it('should close modal after the cancel button is clicked', () => {
    const onClose = jest.fn();
    renderWithProviders(
      <EditInvestmentModal basketId={basketId} isOpen onClose={onClose} />,
    );

    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should set form input values when edited basket is provided', async () => {
    const providedInvestment = investmentResponseFactory.buildOne({
      id: investmentId,
      startAmount: 100000,
    });
    renderWithProviders(
      <EditInvestmentModal
        isOpen
        basketId={basketId}
        onClose={jest.fn()}
        investment={providedInvestment}
      />,
    );

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(providedInvestment.startAmount),
      ).toBeInTheDocument();
    });
  });

  it('should send request when the form is valid and clear form state after a successful response', async () => {
    jest.spyOn(axios, 'put');
    const updatedInvestment = updateInvestmentRequestFactory.buildOne();
    const onEdit = jest.fn();
    renderWithProviders(
      <EditInvestmentModal
        isOpen
        basketId={basketId}
        onClose={jest.fn()}
        onEdit={onEdit}
        investment={investmentResponseFactory.buildOne({
          id: investmentId,
        })}
      />,
    );

    userEvent.type(
      screen.getByLabelText(/years of growth/i),
      `{selectall}${updatedInvestment.yearsOfGrowth}`,
    );
    userEvent.type(
      screen.getByLabelText(/additional payment/i),
      `{selectall}${updatedInvestment.payment}`,
    );
    userEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledTimes(1);
    });
    expect(axios.put).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        payment: updatedInvestment.payment,
        yearsOfGrowth: updatedInvestment.yearsOfGrowth,
      }),
    );
  });

  it('should display error toast when response returns with error', async () => {
    server.use(
      rest.put(
        `/api/me/baskets/${basketId}/investments/${investmentId}`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );

    renderWithProviders(
      <EditInvestmentModal
        isOpen
        basketId={basketId}
        onClose={jest.fn()}
        investment={investmentResponseFactory.buildOne({
          id: investmentId,
        })}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    await waitFor(() =>
      expect(
        screen.getByText(/unexpected error occurred/i),
      ).toBeInTheDocument(),
    );
  });

  it('should display form errors response has 400 status', async () => {
    server.use(
      rest.put(
        `/api/me/baskets/${basketId}/investments/${investmentId}`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              errors: [
                { field: 'annualInterestRate', message: 'annual error' },
              ],
            }),
          );
        },
      ),
    );

    renderWithProviders(
      <EditInvestmentModal
        isOpen
        basketId={basketId}
        onClose={jest.fn()}
        investment={investmentResponseFactory.buildOne({
          id: investmentId,
        })}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    await waitFor(() =>
      expect(screen.getByText(/annual error/i)).toBeInTheDocument(),
    );
  });
});
