import { Route } from '../../shared/types/router';
import React from 'react';

export const MY_SPACE_ROUTES = {
  ROOT: '/',
  BASKET_DETAILS: '/baskets/:basketId',
} as const;

export const MY_SPACE_ROUTING: Route[] = [
  {
    path: MY_SPACE_ROUTES.ROOT,
    component: React.lazy(() => import('./no-basket/no-basket')),
    exact: true,
  },
  {
    path: MY_SPACE_ROUTES.BASKET_DETAILS,
    component: React.lazy(() => import('./basket-details/basket-details')),
  },
];
