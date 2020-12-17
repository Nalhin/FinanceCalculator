import React from 'react';

interface Route {
  path: string;
  exact?: boolean;
  component:
    | React.ComponentType<unknown>
    | React.LazyExoticComponent<React.ComponentType<unknown>>;
  redirectTo?: string;
}

export const MAIN_ROUTES = {
  BASKET_SUMMARY: '/basket-summary',
  CALCULATOR: '/calculator',
  HOME: '/home',
  INVESTMENT_DETAILS: '/investment-details',
  SIGN_UP: '/sign-up',
  LOGIN: '/login',
} as const;

export const MAIN_ROUTING: Route[] = [
  {
    path: MAIN_ROUTES.HOME,
    component: React.lazy(() => import('./home/home')),
  },
  {
    path: MAIN_ROUTES.CALCULATOR,
    component: React.lazy(() => import('./calculator/calculator')),
  },
  {
    path: MAIN_ROUTES.BASKET_SUMMARY,
    component: React.lazy(() => import('./basket/basket')),
  },
  {
    path: MAIN_ROUTES.INVESTMENT_DETAILS,
    component: React.lazy(
      () => import('./investment-details/investment-details'),
    ),
  },
  {
    path: MAIN_ROUTES.LOGIN,
    component: React.lazy(() => import('./login/login')),
  },
  {
    path: MAIN_ROUTES.SIGN_UP,
    component: React.lazy(() => import('./sign-up/sign-up')),
  },
];
