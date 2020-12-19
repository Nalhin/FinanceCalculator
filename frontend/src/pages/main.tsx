import { Box, Progress } from '@chakra-ui/react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { MAIN_ROUTING } from './main.routes';
import Navigation from '../shared/components/navigation/navigation';
import CustomRoute from '../shared/components/router/custom-route';

export const Main = () => {
  return (
    <Box minHeight="100vh">
      <Navigation />
      <React.Suspense
        fallback={
          <Progress
            position="fixed"
            top={0}
            left={0}
            right={0}
            size="xs"
            isIndeterminate
          />
        }
      >
        <Switch>
          {MAIN_ROUTING.map((route) => (
            <CustomRoute key={route.path} {...route} />
          ))}
        </Switch>
      </React.Suspense>
    </Box>
  );
};
