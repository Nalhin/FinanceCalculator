import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import DeleteBasketModal from './delete-basket-modal';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { basketResponseFactory } from '../../../../../test/factory/api/basket';

describe('DeleteBasketModal component', () => {
  const basketId = 1;
  const server = setupServer(
    rest.delete(`/api/me/baskets/${basketId}`, (req, res, ctx) => {
      return res(ctx.status(200));
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should hide modal content when isOpen is false', () => {
    renderWithProviders(
      <DeleteBasketModal isOpen={false} onClose={jest.fn()} />,
    );

    expect(screen.queryByText(/remove basket/i)).not.toBeInTheDocument();
  });

  it('should close modal after delete action is canceled', () => {
    const onCloseMock = jest.fn();
    renderWithProviders(<DeleteBasketModal isOpen onClose={onCloseMock} />);

    userEvent.click(screen.getByRole('button', { name: /no/i }));

    expect(onCloseMock).toBeCalledTimes(1);
  });

  it('should remove basket and call onDelete callback when response is successful', async () => {
    const onDeleteMock = jest.fn();
    renderWithProviders(
      <DeleteBasketModal
        isOpen
        onClose={jest.fn()}
        onDelete={onDeleteMock}
        basket={basketResponseFactory.buildOne({ id: basketId })}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /yes/i });
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(onDeleteMock).toBeCalledTimes(1);
      expect(screen.getByText(/basket deleted!/i)).toBeInTheDocument();
    });
    expect(deleteButton).not.toBeDisabled();
  });

  it('should not execute callback when basket is not found', async () => {
    server.use(
      rest.delete(`/api/me/baskets/${basketId}`, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );
    const onDeleteMock = jest.fn();
    renderWithProviders(
      <DeleteBasketModal
        isOpen
        onClose={jest.fn()}
        onDelete={onDeleteMock}
        basket={basketResponseFactory.buildOne({ id: 1 })}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /yes/i });
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteButton).not.toBeDisabled();
    });
    expect(onDeleteMock).toBeCalledTimes(0);
  });

  it('should display an error when request was unsuccessful', async () => {
    server.use(
      rest.delete(`/api/me/baskets/${basketId}`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    const onDeleteMock = jest.fn();
    renderWithProviders(
      <DeleteBasketModal
        isOpen
        onClose={jest.fn()}
        onDelete={onDeleteMock}
        basket={basketResponseFactory.buildOne({ id: basketId })}
      />,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/unexpected error occurred/i),
      ).toBeInTheDocument();
    });
    expect(onDeleteMock).toBeCalledTimes(0);
  });
});
