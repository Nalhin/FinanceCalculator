import React from 'react';
import { useQuery } from 'react-query';
import { getMyBaskets } from '../../../core/api/basket/basket.api';
import {
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
import AddBasketModal from './add-basket-modal/add-basket-modal';
import BasketItem from './basket-item/basket-item';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { MAIN_ROUTES } from '../../main.routes';
import { MY_SPACE_ROUTES } from '../my-space.routers';
import DeleteBasketModal from './delete-basket-modal/delete-basket-modal';
import EditBasketModal from './edit-basket-modal/edit-basket-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BasketDrawer = ({ isOpen, onClose }: Props) => {
  const history = useHistory();
  const match = useRouteMatch<{ basketId: string }>(
    MAIN_ROUTES.MY_SPACE + MY_SPACE_ROUTES.BASKET_DETAILS,
  );
  const addModal = useDisclosure({ defaultIsOpen: false });
  const [toDeleteId, setToDeleteId] = React.useState<number | null>(null);
  const [toEditId, setToEditId] = React.useState<number | null>();
  const { data, refetch } = useQuery('baskets', getMyBaskets, {
    select: (response) => response.data,
    enabled: isOpen,
  });

  const onRemove = React.useCallback(() => {
    setToDeleteId(null);
    history.push(MAIN_ROUTES.MY_SPACE + MY_SPACE_ROUTES.ROOT);
    refetch();
  }, []);

  const onEdit = React.useCallback(() => {
    setToEditId(null);
    refetch();
  }, []);

  return (
    <>
      <EditBasketModal
        isOpen={Boolean(toEditId)}
        onClose={() => setToEditId(null)}
        onEdit={onEdit}
        basket={data?.content.find((b) => b.id === toEditId)}
      />
      <DeleteBasketModal
        isOpen={Boolean(toDeleteId)}
        onClose={() => setToDeleteId(null)}
        onDelete={onRemove}
        basket={data?.content.find((b) => b.id === toDeleteId)}
      />
      <AddBasketModal
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        onAdd={refetch}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Baskets</DrawerHeader>
            <DrawerBody>
              {data?.content.map((item) => (
                <BasketItem
                  onDelete={setToDeleteId}
                  onEdit={setToEditId}
                  isSelected={match?.params.basketId === String(item.id)}
                  key={item.id}
                  {...item}
                />
              ))}
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme="teal" onClick={addModal.onOpen}>
                Add a basket
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default BasketDrawer;
