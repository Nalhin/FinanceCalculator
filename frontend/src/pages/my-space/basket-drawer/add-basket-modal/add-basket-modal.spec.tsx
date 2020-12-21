import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import AddBasketModal from './add-basket-modal';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { SaveBasketRequestDto } from '../../../../core/api/api.interface';
import { saveBasketRequestFactory } from '../../../../../test/factory/api/basket';
import { axios } from '../../../../core/api/axios';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

describe('AddBasketModal component', () => {
  const server = setupServer(
    rest.post<SaveBasketRequestDto>('/api/me/baskets', (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json(saveBasketRequestFactory.buildOne({ name: req.body.name })),
      );
    }),
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
      <AddBasketModal isOpen onClose={onClose} onAdd={jest.fn()} />,
    );

    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should display errors and not send a request when the form is invalid', async () => {
    const spy = jest.spyOn(axios, 'post');
    renderWithProviders(
      <AddBasketModal isOpen onClose={jest.fn()} onAdd={jest.fn()} />,
    );

    userEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() =>
      expect(screen.getByText(/basket name is required/i)).toBeInTheDocument(),
    );
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should send request when the form is valid and clear form state after a successful response', async () => {
    const saveBasketRequest = saveBasketRequestFactory.buildOne();
    const onAdd = jest.fn();
    renderWithProviders(
      <AddBasketModal isOpen onClose={jest.fn()} onAdd={onAdd} />,
    );

    userEvent.type(
      screen.getByLabelText(/basket name/i),
      saveBasketRequest.name,
    );
    userEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/basket name/i)).toHaveValue('');
    });
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
