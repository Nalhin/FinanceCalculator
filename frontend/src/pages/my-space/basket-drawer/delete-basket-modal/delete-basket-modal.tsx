import React from 'react';
import { BasketResponseDto } from '../../../../core/api/api.interface';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { deleteBasket } from '../../../../core/api/basket/basket.api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  basket?: BasketResponseDto;
}

const DeleteBasketModal = ({ isOpen, onClose, onDelete, basket }: Props) => {
  const { mutate, isLoading } = useMutation(
    () => deleteBasket(basket?.id as number),
    {
      onSuccess: onDelete,
    },
  );

  const handleDelete = () => {
    mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove basket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete basket with name {basket?.name}?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            No
          </Button>
          <Button variant="ghost" isLoading={isLoading} onClick={handleDelete}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBasketModal;
