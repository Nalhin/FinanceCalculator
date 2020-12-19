import { Box, Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import BasketsDrawer from './baskets/baskets-drawer';

const MySpace = () => {
  const drawer = useDisclosure({ defaultIsOpen: false });

  return (
    <Box>
      <Button onClick={drawer.onOpen}>Open</Button>
      <BasketsDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
    </Box>
  );
};

export default MySpace;
