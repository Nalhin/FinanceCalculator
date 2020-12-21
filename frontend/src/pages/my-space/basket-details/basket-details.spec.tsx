import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { investmentResponseFactory } from '../../../../test/factory/api/investment';
import { renderWithProviders } from '../../../../test/render/render-with-providers';
import BasketDetails from './basket-details';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('BasketDetails component', () => {
  const basketId = 1;
  const server = setupServer(
    rest.get(`/api/me/baskets/${basketId}/investments`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(investmentResponseFactory.buildMany(4)),
      );
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it('should open add investment modal', () => {
    renderWithProviders(<BasketDetails />);

    userEvent.click(screen.getByRole('button', { name: /add an investment/i }));

    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });
});
