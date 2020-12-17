import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SaveBasketRequestDto } from '../../core/api/api.interface';
import { useMutation } from 'react-query';
import { saveBasket } from '../../core/api/baskets/basket.api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const AddBasketModal = ({ isOpen, onClose, onAdd }: Props) => {
  const { mutate, isLoading } = useMutation(saveBasket, { onSuccess: onAdd });
  const { handleSubmit, register, errors } = useForm<SaveBasketRequestDto>({
    defaultValues: { name: '' },
  });

  const addBasket = (form: SaveBasketRequestDto) => {
    mutate(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Add a basket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(addBasket)} id="add-basket">
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Basket name</FormLabel>
              <Input
                id="name"
                name="name"
                ref={register({
                  required: 'Basket name is required',
                })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            isLoading={isLoading}
            type="submit"
            form="add-basket"
          >
            Add Basket
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBasketModal;
