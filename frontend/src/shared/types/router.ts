import * as H from 'history';
import { User } from '../models/user/user';
import React from 'react';
import { RouteNames } from '../../pages/main.routes';

export type RouterLocation<T = void> = H.Location<T>;

export interface CanActivate {
  validation: (user: User) => boolean;
  redirectTo: RouteNames;
}

export interface Route {
  path: string;
  exact?: boolean;
  component:
    | React.ComponentType<any>
    | React.LazyExoticComponent<React.ComponentType<any>>;
  canActivate?: CanActivate;
}
