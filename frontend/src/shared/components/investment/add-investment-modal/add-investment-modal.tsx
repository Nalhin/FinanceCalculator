import React from 'react';
import { useForm } from 'react-hook-form';
import { DEFAULT_INVESTMENT_CONFIG } from '../../../constants/default-investment-config';
import { SaveInvestmentRequestDto } from '../../../../core/api/api.types';
import {
  Box,
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
import InvestmentConfigFormControlGroup from '../../forms/investment-config-form-control-group/investment-config-form-control-group';
import { useMutation } from 'react-query';
import { saveInvestment } from '../../../../core/api/investment/investment.api';
import { yupResolver } from '@hookform/resolvers/yup';
import InvestmentCategoryFormSelect from '../../forms/investment-category-form-select/investment-category-form-select';
import { INVESTMENT_FORM_SCHEMA } from '../../../models/form/investment-form-schema';
import { AxiosError } from 'axios';
import { onAxiosError } from '../../../utils/on-axios-error/on-axios-error';
import { populateFormWithApiErrors } from '../../../utils/on-axios-error/populate-form-with-api-errors';

const DEFAULT_FORM_VALUES: SaveInvestmentRequestDto = {
  ...DEFAULT_INVESTMENT_CONFIG,
  category: 'CERTIFICATE_OF_DEPOSIT',
};

interface Props {
  basketId: number;
  isOpen: boolean;
  onClose: () => void;
  onAdd?: () => void;
}

const AddInvestmentModal = ({ basketId, isOpen, onClose, onAdd }: Props) => {
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    reset,
    errors,
    setError,
  } = useForm<SaveInvestmentRequestDto>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(INVESTMENT_FORM_SCHEMA),
  });
  const { mutate, isLoading } = useMutation(
    (variables: SaveInvestmentRequestDto) =>
      saveInvestment(variables, basketId),
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
        reset();
        onAdd?.();
      },
    },
  );

  const sendForm = (form: SaveInvestmentRequestDto) => {
    mutate(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add an investment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            width="100%"
            as="form"
            onSubmit={handleSubmit(sendForm)}
            id="add-modal"
          >
            <InvestmentCategoryFormSelect
              label="Investment category"
              name="category"
              ref={register}
            />
            <InvestmentConfigFormControlGroup
              control={control}
              errors={errors}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            width="100%"
            form="add-modal"
            isLoading={isLoading}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddInvestmentModal;
