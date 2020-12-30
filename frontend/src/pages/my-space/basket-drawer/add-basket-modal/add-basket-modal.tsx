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
import { useForm } from 'react-hook-form';
import { SaveBasketRequestDto } from '../../../../core/api/api.types';
import { useMutation } from 'react-query';
import { saveBasket } from '../../../../core/api/basket/basket.api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormControl from '../../../../shared/components/forms/input-form-control/input-form-control';
import { AxiosError } from 'axios';
import { onAxiosError } from '../../../../shared/utils/on-axios-error/on-axios-error';
import { populateFormWithApiErrors } from '../../../../shared/utils/on-axios-error/populate-form-with-api-errors';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});

const DEFAULT_FORM_VALUES = {
  name: '',
  description: '',
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: () => void;
}

const AddBasketModal = ({ isOpen, onClose, onAdd }: Props) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setError,
  } = useForm<SaveBasketRequestDto>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = useMutation(saveBasket, {
    onError: (error: AxiosError) => {
      onAxiosError(error, {
        400: () => populateFormWithApiErrors(error, setError),
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
      onAdd?.();
      reset();
    },
  });

  const addBasket = (form: SaveBasketRequestDto) => {
    mutate(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a basket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(addBasket)} id="add-basket">
            <InputFormControl
              label="Name"
              name="name"
              error={errors.name}
              ref={register}
            />
            <InputFormControl
              label="Description"
              name="description"
              error={errors.description}
              ref={register}
            />
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
