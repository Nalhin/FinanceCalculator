import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { SaveBasketRequestDto } from '../../../../core/api/api.interface';
import {
  basketResponseFactory,
  saveBasketRequestFactory,
} from '../../../../../test/factory/api/basket';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { axios } from '../../../../core/api/axios';
import React from 'react';
import EditBasketModal from './edit-basket-modal';

describe('EditBasketModal component', () => {
  const basketId = 1;
  const server = setupServer(
    rest.put<SaveBasketRequestDto>(
      `/api/me/baskets/${basketId}`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(
            basketResponseFactory.buildOne({
              id: basketId,
              name: req.body.name,
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
    renderWithProviders(<EditBasketModal isOpen onClose={onClose} />);

    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should set form input values when edited basket is provided', () => {
    const basket = basketResponseFactory.buildOne();
    renderWithProviders(
      <EditBasketModal isOpen onClose={jest.fn()} basket={basket} />,
    );

    expect(screen.getByDisplayValue(basket.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(basket.description)).toBeInTheDocument();
  });

  it('should display errors and shouldnt send a request when the form is invalid', async () => {
    jest.spyOn(axios, 'put');
    renderWithProviders(
      <EditBasketModal
        isOpen
        onClose={jest.fn()}
        basket={basketResponseFactory.buildOne({ id: basketId })}
      />,
    );

    userEvent.clear(screen.getByLabelText(/name/i));
    userEvent.clear(screen.getByLabelText(/description/i));
    userEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });
    expect(axios.put).toHaveBeenCalledTimes(0);
  });

  it('should send request when the form is valid and clear form state after a successful response', async () => {
    jest.spyOn(axios, 'put');
    const saveBasketRequest = saveBasketRequestFactory.buildOne();
    const onEdit = jest.fn();
    renderWithProviders(
      <EditBasketModal
        isOpen
        onClose={jest.fn()}
        onEdit={onEdit}
        basket={basketResponseFactory.buildOne({ id: basketId })}
      />,
    );

    userEvent.type(
      screen.getByLabelText(/name/i),
      `{selectall}${saveBasketRequest.name}`,
    );
    userEvent.type(
      screen.getByLabelText(/description/i),
      `{selectall}${saveBasketRequest.description}`,
    );
    userEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledTimes(1);
    });
    expect(axios.put).toBeCalledWith(expect.any(String), saveBasketRequest);
  });
});
