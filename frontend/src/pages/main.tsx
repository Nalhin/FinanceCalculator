import { Box, Progress } from '@chakra-ui/react';
import React from 'react';
import { Switch } from 'react-router-dom';
import { MAIN_ROUTING } from './main.routes';
import Navigation from '../shared/components/navigation/navigation';
import CustomRoute from '../shared/components/router/custom-route';
import { useIsFetching } from 'react-query';

export const Main = () => {
  const isFetching = useIsFetching();

  return (
    <Box minHeight="100vh">
      {isFetching > 0 && (
        <Progress
          position="fixed"
          top={0}
          left={0}
          right={0}
          size="xs"
          isIndeterminate
        />
      )}
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
