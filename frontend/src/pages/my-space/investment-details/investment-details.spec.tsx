import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { investmentResponseFactory } from '../../../../test/factory/api/investment';
import { renderWithProviders } from '../../../../test/render/render-with-providers';
import React from 'react';
import InvestmentDetails from './investment-details';
import { generatePath } from 'react-router-dom';
import { MY_SPACE_ROUTES } from '../my-space.routers';
import { waitFor, screen } from '@testing-library/react';
import { MAIN_ROUTES } from '../../main.routes';

describe('InvestmentDetails component', () => {
  const basketId = 1;
  const investmentId = 1;

  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());

  it('should display investment summary', async () => {
    const response = investmentResponseFactory.buildOne({
      startAmount: 150,
      payment: 100,
      id: investmentId,
      risk: 'HIGH',
      category: 'CERTIFICATE_OF_DEPOSIT',
    });
    server.use(
      rest.get(
        `/api/me/baskets/${basketId}/investments/${investmentId}`,
        (req, res, ctx) => {
          return res(ctx.status(201), ctx.json(response));
        },
      ),
    );
    renderWithProviders(<InvestmentDetails />, {
      route: generatePath(MY_SPACE_ROUTES.INVESTMENT_DETAILS, {
        basketId,
        investmentId,
      }),
      path: MY_SPACE_ROUTES.INVESTMENT_DETAILS,
    });

    await waitFor(() => {
      expect(screen.getByText(`${response.payment}$`)).toBeInTheDocument();
    });

    expect(screen.getByText(/high risk/i)).toBeInTheDocument();
    expect(screen.getByText(/certificate of deposit/i)).toBeInTheDocument();
  });

  it('should redirect when investment is not found', async () => {
    server.use(
      rest.get(
        `/api/me/baskets/${basketId}/investments/${investmentId}`,
        (req, res, ctx) => {
          return res(ctx.status(404));
        },
      ),
    );
    const { history } = renderWithProviders(<InvestmentDetails />, {
      route: generatePath(MY_SPACE_ROUTES.INVESTMENT_DETAILS, {
        basketId,
        investmentId,
      }),
      path: MY_SPACE_ROUTES.INVESTMENT_DETAILS,
    });

    await waitFor(() => {
      expect(screen.getByText(/investment was not found/i)).toBeInTheDocument();
    });
    expect(history?.location.pathname).toBe(MAIN_ROUTES.MY_SPACE);
  });

  it('should display toast with error when status is not handled', async () => {
    server.use(
      rest.get(
        `/api/me/baskets/${basketId}/investments/${investmentId}`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );
    renderWithProviders(<InvestmentDetails />, {
      route: generatePath(MY_SPACE_ROUTES.INVESTMENT_DETAILS, {
        basketId,
        investmentId,
      }),
      path: MY_SPACE_ROUTES.INVESTMENT_DETAILS,
    });

    await waitFor(() => {
      expect(
        screen.getByText(/unexpected error occurred/i),
      ).toBeInTheDocument();
    });
  });
});
