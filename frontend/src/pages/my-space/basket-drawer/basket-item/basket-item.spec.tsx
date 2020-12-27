import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasketItem from './basket-item';

describe('BasketItem component', () => {
  const props = {
    name: 'basket name',
    createdDate: new Date().toISOString(),
    id: 1,
    description: 'description',
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  it('should redirect to provided route on click', () => {
    const { history } = renderWithProviders(<BasketItem {...props} id={1} />);

    userEvent.click(screen.getByText(/basket name/i));

    expect(history.location.pathname).toBe('/my-space/baskets/1');
  });

  it('should fire onRemove callback with basket id without redirecting', () => {
    const onEditMock = jest.fn();
    const { history } = renderWithProviders(
      <BasketItem {...props} onEdit={onEditMock} id={1} />,
    );

    userEvent.click(screen.getByLabelText(/edit/i));

    expect(history).toHaveLength(1);
    expect(onEditMock).toBeCalledWith(1);
  });

  it('should fire onEdit callback with basket id without redirecting', () => {
    const onDeleteMock = jest.fn();
    const { history } = renderWithProviders(
      <BasketItem {...props} onDelete={onDeleteMock} id={1} />,
    );

    userEvent.click(screen.getByLabelText(/delete/i));

    expect(history).toHaveLength(1);
    expect(onDeleteMock).toBeCalledWith(1);
  });
});
