import React from 'react';
import { BasketResponseDto } from '../../../../core/api/api.types';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { deleteBasket } from '../../../../core/api/basket/basket.api';
import { AxiosError } from 'axios';
import { onAxiosError } from '../../../../shared/utils/on-axios-error/on-axios-error';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  basket?: BasketResponseDto;
}

const DeleteBasketModal = ({ isOpen, onClose, onDelete, basket }: Props) => {
  const toast = useToast();
  const { mutate, isLoading } = useMutation(
    () => deleteBasket(basket?.id as number),
    {
      onError: (error: AxiosError) => {
        onAxiosError(error, {
          '*': () => {
            toast({
              title: 'Unexpected error occurred',
              status: 'error',
              isClosable: true,
            });
          },
        });
      },
      onSuccess: () => {
        onDelete?.();
        toast({
          title: 'Basket deleted!',
          status: 'success',
          isClosable: true,
        });
      },
    },
  );

  const handleDelete = () => {
    mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete basket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete basket with name {basket?.name}?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="teal"
            isLoading={isLoading}
            onClick={handleDelete}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBasketModal;
