import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useDrawer } from '../../../shared/context/drawer/use-drawer/use-drawer';

const NoBasket = () => {
  const drawer = useDrawer();
  return (
    <Box textAlign="center" fontSize="2xl" fontWeight="bold" mt={6}>
      <Box>No basket selected</Box>
      <Button colorScheme="teal" mt={2} onClick={drawer.onOpen}>
        Select a basket
      </Button>
    </Box>
  );
};

export default NoBasket;
