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
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SaveBasketRequestDto } from '../../../../core/api/api.interface';
import { useMutation } from 'react-query';
import { saveBasket } from '../../../../core/api/basket/basket.api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Basket name is required'),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: () => void;
}

const AddBasketModal = ({ isOpen, onClose, onAdd }: Props) => {
  const {
    handleSubmit,
    register,
    errors,
    reset,
  } = useForm<SaveBasketRequestDto>({
    defaultValues: { name: '' },
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = useMutation(saveBasket, {
    onSuccess: () => {
      onAdd?.();
      reset();
    },
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
            Cancel
          </Button>
          <Button
            variant="ghost"
            isLoading={isLoading}
            type="submit"
            form="add-basket"
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBasketModal;
