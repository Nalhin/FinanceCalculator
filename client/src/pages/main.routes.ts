import React from 'react';

interface Route {
  path: string;
  exact?: boolean;
  component:
    | React.ComponentType<any>
    | React.LazyExoticComponent<React.ComponentType<any>>;
  redirectTo?: string;
}

export const MAIN_ROUTES = {
  BASKET_SUMMARY: '/basket-summary',
  CALCULATOR: '/calculator',
  HOME: '/home',
  INVESTMENT_DETAILS: '/investment-details',
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
    component: React.lazy(() => import('./basket-summary/basket-summary')),
  },
  {
    path: MAIN_ROUTES.INVESTMENT_DETAILS,
    component: React.lazy(
      () => import('./investment-details/investment-details'),
    ),
  },
];
