import React from 'react';
import { renderWithProviders } from '../../../../test/render/render-with-providers';
import Navigation from './navigation';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MAIN_ROUTES } from '../../../pages/main.routes';

describe('NavigationComponent', () => {
  it.each`
    selector         | expectedPathname
    ${/home/i}       | ${MAIN_ROUTES.HOME}
    ${/calculator/i} | ${MAIN_ROUTES.CALCULATOR}
    ${/my space/i}   | ${MAIN_ROUTES.MY_SPACE}
  `(
    'should navigate to $expectedPathname after a navlink is clicked',
    ({ selector, expectedPathname }) => {
      const { history } = renderWithProviders(<Navigation />);

      userEvent.click(screen.getByText(selector));

      expect(history?.length).toBe(2);
      expect(history.location.pathname).toBe(expectedPathname);
    },
  );
});
