import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { getMyBaskets } from '../../core/api/baskets/basket.api';
import AddBasketModal from './add-basket-modal';

const Basket = () => {
  const { data, refetch } = useQuery('baskets', getMyBaskets, {
    select: (response) => response.data,
  });

  const drawer = useDisclosure();
  const modal = useDisclosure({ defaultIsOpen: false });

  return (
    <Box>
      <Button onClick={drawer.onOpen}>Drawer</Button>
      <AddBasketModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        onAdd={refetch}
      />
      <Drawer isOpen={drawer.isOpen} placement="right" onClose={drawer.onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Baskets</DrawerHeader>
            <DrawerBody>
              {data?.content.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme="teal" onClick={modal.onOpen}>
                Add a basket
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Basket;
