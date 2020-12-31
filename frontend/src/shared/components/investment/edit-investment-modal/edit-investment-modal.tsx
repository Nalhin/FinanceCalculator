import React from 'react';
import { useForm } from 'react-hook-form';
import {
  InvestmentResponseDto,
  SaveInvestmentRequestDto,
  UpdateInvestmentRequestDto,
} from '../../../../core/api/api.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { updateInvestment } from '../../../../core/api/investment/investment.api';
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
import InvestmentCategoryFormSelect from '../../forms/investment-category-form-select/investment-category-form-select';
import InvestmentConfigFormControlGroup from '../../forms/investment-config-form-control-group/investment-config-form-control-group';
import { DEFAULT_INVESTMENT_CONFIG } from '../../../constants/default-investment-config';
import { INVESTMENT_FORM_SCHEMA } from '../../../models/form/investment-form-schema';
import type { AxiosError } from 'axios';
import { onAxiosError } from '../../../utils/on-axios-error/on-axios-error';
import { populateFormWithApiErrors } from '../../../utils/populate-form-with-api-errors/populate-form-with-api-errors';

const DEFAULT_FORM_VALUES: SaveInvestmentRequestDto = {
  ...DEFAULT_INVESTMENT_CONFIG,
  category: 'CERTIFICATE_OF_DEPOSIT',
};

interface Props {
  basketId: number;
  investment?: InvestmentResponseDto;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

const EditInvestmentModal = ({
  basketId,
  onClose,
  isOpen,
  investment,
  onEdit,
}: Props) => {
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    reset,
    errors,
    setError,
  } = useForm<UpdateInvestmentRequestDto>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(INVESTMENT_FORM_SCHEMA),
  });
  const { mutate, isLoading } = useMutation(
    (body: UpdateInvestmentRequestDto) =>
      updateInvestment(body, basketId, investment?.id as number),
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
        onClose();
        toast({
          title: 'Investment updated!',
          status: 'success',
          isClosable: true,
        });
      },
    },
  );

  React.useEffect(() => {
    if (investment) {
      reset(investment);
    }
  }, [investment]);

  const sendForm = (form: SaveInvestmentRequestDto) => {
    mutate(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit investment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            width="100%"
            as="form"
            onSubmit={handleSubmit(sendForm)}
            id="edit-investment"
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
            type="submit"
            width="100%"
            form="edit-investment"
            isLoading={isLoading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditInvestmentModal;
