import { CircularProgress, Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MAIN_ROUTING } from './main.routes';
import Navigation from '../shared/components/navigation/navigation';

export const Main = () => {
  return (
    <Box minHeight="100vh">
      <Navigation />
      <React.Suspense
        fallback={<CircularProgress isIndeterminate color="green.300" />}
      >
        <Switch>
          {MAIN_ROUTING.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </React.Suspense>
    </Box>
  );
};
