import CustomRoute from './custom-route';
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/render/render-with-providers';
import { authenticatedUserFactory } from '../../../../test/factory/user/user';
import { MAIN_ROUTES } from '../../../pages/main.routes';
import { RouterLocation } from '../../types/router';

describe('CustomRoute component', () => {
  it('should not redirect when can activate is undefined', () => {
    renderWithProviders(
      <CustomRoute canActivate={undefined} render={() => <div>test</div>} />,
    );

    expect(screen.getByText(/test/)).toBeInTheDocument();
  });

  it('should not redirect when canActivate.validation evaluates to true', () => {
    renderWithProviders(
      <CustomRoute
        canActivate={{
          validation: (user) => user.isAuthenticated,
          redirectTo: MAIN_ROUTES.HOME,
        }}
        render={() => <div>test</div>}
      />,
      { user: authenticatedUserFactory.buildOne() },
    );

    expect(screen.getByText(/test/)).toBeInTheDocument();
  });

  it('should redirect when canActivate.validation evaluates to false', () => {
    const { history } = renderWithProviders(
      <CustomRoute
        canActivate={{
          validation: (user) => !user.isAuthenticated,
          redirectTo: MAIN_ROUTES.HOME,
        }}
        render={() => <div>test</div>}
      />,
      { user: authenticatedUserFactory.buildOne() },
    );

    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
    expect(history?.location.pathname).toBe(MAIN_ROUTES.HOME);
  });

  it('should pass current route as route state to redirected route', () => {
    const expectedLocation = { pathname: '/path' } as RouterLocation;
    const { history } = renderWithProviders(
      <CustomRoute
        location={expectedLocation}
        canActivate={{
          validation: (user) => !user.isAuthenticated,
          redirectTo: MAIN_ROUTES.HOME,
        }}
        render={() => <div>test</div>}
      />,
      { user: authenticatedUserFactory.buildOne() },
    );

    expect(
      (history.location as RouterLocation<{ from: RouterLocation }>).state.from,
    ).toStrictEqual(expectedLocation);
  });
});
