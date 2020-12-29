import { Box, IconButton, Progress, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import BasketDrawer from './basket-drawer/basket-drawer';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { MY_SPACE_ROUTING } from './my-space.routers';
import { FaList } from 'react-icons/fa';

const MySpace = () => {
  const { path } = useRouteMatch();
  const drawer = useDisclosure({ defaultIsOpen: false });

  return (
    <Box>
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
      <IconButton
        width={12}
        height={12}
        colorScheme="teal"
        onClick={drawer.onOpen}
        icon={<FaList />}
        aria-label="add an investment"
        rounded="full"
        position="fixed"
        bottom={4}
        right={4}
      />
    </Box>
  );
};

export default MySpace;
