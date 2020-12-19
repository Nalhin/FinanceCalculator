import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../../context/auth/use-user/use-user';
import { RouteProps } from 'react-router';
import { CanActivate } from '../../types/router';

interface Props extends RouteProps {
  canActivate?: CanActivate;
}

const CustomRoute = ({ canActivate, ...rest }: Props) => {
  const { user } = useUser();

  const shouldRedirect = canActivate && !canActivate.validation(user);

  return shouldRedirect ? (
    <Redirect
      to={{
        pathname: canActivate?.redirectTo,
        state: { from: rest.location },
      }}
    />
  ) : (
    <Route {...rest} />
  );
};

export default CustomRoute;
