import { CircularProgress } from '@chakra-ui/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MAIN_ROUTING } from './main.routes';

export const Main = () => {
  return (
    <React.Suspense
      fallback={<CircularProgress isIndeterminate color="green.300" />}
    >
      <Switch>
        {MAIN_ROUTING.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </React.Suspense>
  );
};
