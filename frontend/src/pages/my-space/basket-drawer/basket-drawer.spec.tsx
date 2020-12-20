import * as React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { basketResponseFactory } from '../../../../test/factory/api/basket';
import { renderWithProviders } from '../../../../test/render/render-with-providers';
import { screen, waitFor } from '@testing-library/react';
import BasketDrawer from './basket-drawer';
import userEvent from '@testing-library/user-event';
import { axios } from '../../../core/api/axios';

describe('BasketDrawer', () => {
  const baskets = basketResponseFactory.buildMany(4, {
    partial: { name: 'name' },
  });
  const server = setupServer(
    rest.get('/api/me/baskets', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ content: baskets }));
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());

  it('should not fetch when closed', async () => {
    const spy = jest.spyOn(axios, 'get');

    renderWithProviders(<BasketDrawer isOpen={false} onClose={jest.fn()} />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should fetch and display baskets', async () => {
    renderWithProviders(<BasketDrawer isOpen onClose={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getAllByText(/name/i)).toHaveLength(4);
    });
  });

  it('should open add basket modal', () => {
    renderWithProviders(<BasketDrawer isOpen onClose={jest.fn()} />);

    userEvent.click(screen.getByRole('button', { name: /add a basket/i }));

    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/basket name/i)).toBeInTheDocument();
  });
});
