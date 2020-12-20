import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasketItem from './basket-item';

describe('BasketItem component', () => {
  it('should redirect to provided route on click', () => {
    const { history } = renderWithProviders(
      <BasketItem createdDate={''} name={'basket name'} to={'/expected'} />,
    );

    userEvent.click(screen.getByText(/basket name/i));

    expect(history.location.pathname).toBe('/expected');
  });
});
