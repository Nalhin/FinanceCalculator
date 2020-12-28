import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DeleteInvestmentModal from './delete-investment-modal';

describe('DeleteInvestmentModal component', () => {
  const basketId = 1;
  const investmentId = 1;

  const server = setupServer(
    rest.delete(
      `/api/me/baskets/${basketId}/investments/${investmentId}`,
      (req, res, ctx) => {
        return res(ctx.status(200));
      },
    ),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should hide modal content when isOpen is false', () => {
    renderWithProviders(
      <DeleteInvestmentModal
        investmentId={null}
        basketId={basketId}
        isOpen={false}
        onClose={jest.fn()}
      />,
    );

    expect(screen.queryByText(/remove basket/i)).not.toBeInTheDocument();
  });

  it('should close modal after delete action is canceled', () => {
    const onCloseMock = jest.fn();
    renderWithProviders(
      <DeleteInvestmentModal
        basketId={basketId}
        investmentId={investmentId}
        isOpen
        onClose={onCloseMock}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /no/i }));

    expect(onCloseMock).toBeCalledTimes(1);
  });

  it('should remove investment and call onDelete callback when response is successful', async () => {
    const onDeleteMock = jest.fn();
    renderWithProviders(
      <DeleteInvestmentModal
        isOpen
        onClose={jest.fn()}
        onDelete={onDeleteMock}
        basketId={basketId}
        investmentId={investmentId}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /yes/i });
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(onDeleteMock).toBeCalledTimes(1);
    });
    expect(deleteButton).not.toBeDisabled();
  });

  it('should not execute callback when investment or basket is not found', async () => {
    const onDeleteMock = jest.fn();
    renderWithProviders(
      <DeleteInvestmentModal
        isOpen
        basketId={basketId}
        investmentId={investmentId}
        onClose={jest.fn()}
        onDelete={onDeleteMock}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /yes/i });
    userEvent.click(deleteButton);

    await waitFor(() => expect(deleteButton).not.toBeDisabled());
    expect(onDeleteMock).toBeCalledTimes(0);
  });
});
