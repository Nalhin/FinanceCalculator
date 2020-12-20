import React from 'react';
import { User } from '../shared/models/user/user';
import { Route } from '../shared/types/router';

export const MAIN_ROUTES = {
  MY_SPACE: '/my-space',
  CALCULATOR: '/calculator',
  HOME: '/home',
  SIGN_UP: '/sign-up',
  LOGIN: '/login',
} as const;

export type RouteNames = typeof MAIN_ROUTES[keyof typeof MAIN_ROUTES];

const authRequired = (user: User) => user.isAuthenticated;
const noAuth = (user: User) => !user.isAuthenticated;

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
    path: MAIN_ROUTES.MY_SPACE,
    component: React.lazy(() => import('./my-space/my-space')),
    canActivate: {
      validation: authRequired,
      redirectTo: MAIN_ROUTES.LOGIN,
    },
  },
  {
    path: MAIN_ROUTES.LOGIN,
    component: React.lazy(() => import('./login/login')),
    canActivate: {
      validation: noAuth,
      redirectTo: MAIN_ROUTES.HOME,
    },
  },
  {
    path: MAIN_ROUTES.SIGN_UP,
    component: React.lazy(() => import('./sign-up/sign-up')),
    canActivate: {
      validation: noAuth,
      redirectTo: MAIN_ROUTES.HOME,
    },
  },
];
