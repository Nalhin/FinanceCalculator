import { Box, Button, Progress, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import BasketDrawer from './basket-drawer/basket-drawer';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { MY_SPACE_ROUTING } from './my-space.routers';

const MySpace = () => {
  const { path } = useRouteMatch();
  const drawer = useDisclosure({ defaultIsOpen: false });

  return (
    <Box>
      <Button onClick={drawer.onOpen}>Open</Button>
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
          {MY_SPACE_ROUTING.map((route) => (
            <Route key={route.path} {...route} path={path + route.path} />
          ))}
        </Switch>
      </React.Suspense>
      <BasketDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
    </Box>
  );
};

export default MySpace;
