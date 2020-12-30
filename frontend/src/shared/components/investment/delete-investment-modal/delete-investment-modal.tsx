import { useMutation } from 'react-query';
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
import React from 'react';
import { deleteInvestment } from '../../../../core/api/investment/investment.api';
import { AxiosError } from 'axios';
import { onAxiosError } from '../../../utils/on-axios-error/on-axios-error';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  basketId: number;
  investmentId: number | null;
}

const DeleteInvestmentModal = ({
  isOpen,
  onClose,
  onDelete,
  basketId,
  investmentId,
}: Props) => {
  const toast = useToast();
  const { mutate, isLoading } = useMutation(
    () => deleteInvestment(basketId, investmentId as number),
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
        onClose();
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
        <ModalHeader>Delete investment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete the investment?</ModalBody>
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

export default DeleteInvestmentModal;
