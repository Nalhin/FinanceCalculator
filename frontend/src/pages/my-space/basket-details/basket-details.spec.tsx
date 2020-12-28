import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { investmentResponseFactory } from '../../../../test/factory/api/investment';
import { renderWithProviders } from '../../../../test/render/render-with-providers';
import BasketDetails from './basket-details';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { MY_SPACE_ROUTES } from '../my-space.routers';
import { generatePath } from 'react-router-dom';

describe('BasketDetails component', () => {
  const basketId = 1;
  const server = setupServer(
    rest.get(`/api/me/baskets/${basketId}/investments`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          investmentResponseFactory.buildMany(4, {
            partial: { category: 'CERTIFICATE_OF_DEPOSIT' },
          }),
        ),
      );
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it('should open add investment modal', () => {
    renderWithProviders(<BasketDetails />, {
      route: generatePath(MY_SPACE_ROUTES.BASKET_DETAILS, { basketId: 1 }),
      path: MY_SPACE_ROUTES.BASKET_DETAILS,
    });

    userEvent.click(screen.getByLabelText(/add an investment/i));

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('should display baskets', async () => {
    renderWithProviders(<BasketDetails />, {
      route: generatePath(MY_SPACE_ROUTES.BASKET_DETAILS, { basketId: 1 }),
      path: MY_SPACE_ROUTES.BASKET_DETAILS,
    });

    await waitFor(() => {
      expect(screen.getAllByText(/certificate of deposit/i)).toHaveLength(4);
    });
  });
});
