import React from 'react';
import { useQuery } from 'react-query';
import { getMyBaskets } from '../../../core/api/baskets/basket.api';
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
import AddBasketModal from './add-basket-modal';
import BasketItem from './basket-item';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BasketsDrawer = ({ isOpen, onClose }: Props) => {
  const modal = useDisclosure({ defaultIsOpen: false });
  const { data, refetch } = useQuery('baskets', getMyBaskets, {
    select: (response) => response.data,
    enabled: isOpen,
  });
  return (
    <>
      <AddBasketModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        onAdd={refetch}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Baskets</DrawerHeader>
            <DrawerBody>
              {data?.content.map((item) => (
                <BasketItem key={item.id} {...item} />
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
    </>
  );
};

export default BasketsDrawer;
