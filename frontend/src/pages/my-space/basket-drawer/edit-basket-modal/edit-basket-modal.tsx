import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {
  BasketResponseDto,
  UpdateBasketRequestDto,
} from '../../../../core/api/api.interface';
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
} from '@chakra-ui/react';
import InputFormControl from '../../../../shared/components/forms/input-form-control/input-form-control';

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
  const {
    handleSubmit,
    register,
    errors,
    setValue,
  } = useForm<UpdateBasketRequestDto>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (basket) {
      for (const [key, value] of Object.entries(basket)) {
        if (DEFAULT_FORM_VALUES.hasOwnProperty(key)) {
          setValue(key as keyof typeof DEFAULT_FORM_VALUES, value);
        }
      }
    }
  }, [basket]);

  const { mutate, isLoading } = useMutation(
    (body: UpdateBasketRequestDto) => updateBasket(body, basket?.id as number),
    {
      onSuccess: () => onEdit?.(),
    },
  );

  const addBasket = (form: UpdateBasketRequestDto) => {
    mutate(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit basket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(addBasket)} id="edit-basket">
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
            variant="ghost"
            isLoading={isLoading}
            type="submit"
            form="edit-basket"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBasketModal;
