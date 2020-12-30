import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { updateBasket } from '../../../../core/api/basket/basket.api';
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
import InputFormControl from '../../../../shared/components/forms/input-form-control/input-form-control';
import {
  BasketResponseDto,
  UpdateBasketRequestDto,
} from '../../../../core/api/api.types';
import { AxiosError } from 'axios';
import { onAxiosError } from '../../../../shared/utils/on-axios-error/on-axios-error';
import { populateFormWithApiErrors } from '../../../../shared/utils/populate-form-with-api-errors/populate-form-with-api-errors';

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
  onEdit?: () => void;
  basket?: BasketResponseDto;
}

const EditBasketModal = ({ isOpen, onClose, onEdit, basket }: Props) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setError,
  } = useForm<UpdateBasketRequestDto>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (basket) {
      reset(basket);
    }
  }, [basket]);

  const { mutate, isLoading } = useMutation(
    (body: UpdateBasketRequestDto) => updateBasket(body, basket?.id as number),
    {
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
        onEdit?.();
        toast({
          title: 'Basket updated!',
          status: 'success',
          isClosable: true,
        });
      },
    },
  );

  const editBasket = (form: UpdateBasketRequestDto) => {
    mutate(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit basket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(editBasket)} id="edit-basket-form">
            <InputFormControl
              label="Basket name"
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
            colorScheme="teal"
            isLoading={isLoading}
            type="submit"
            form="edit-basket-form"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBasketModal;
