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
} from '@chakra-ui/react';
import InvestmentCategoryFormSelect from '../../../../shared/components/forms/investment-category-form-select/investment-category-form-select';
import InvestmentConfigFormControlGroup from '../../../../shared/components/forms/investment-config-form-control-group/investment-config-form-control-group';
import { DEFAULT_INVESTMENT_CONFIG } from '../../../../shared/constants/default-investment-config';
import { INVESTMENT_FORM_SCHEMA } from '../../../../shared/models/form/investment-form-schema';

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
  const {
    control,
    register,
    handleSubmit,
    reset,
    errors,
  } = useForm<UpdateInvestmentRequestDto>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(INVESTMENT_FORM_SCHEMA),
  });
  const { mutate, isLoading } = useMutation(
    (body: UpdateInvestmentRequestDto) =>
      updateInvestment(body, basketId, investment?.id as number),
    {
      onSuccess: () => {
        onEdit?.();
        onClose();
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
        <ModalHeader>Edit an investment</ModalHeader>
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
            size="md"
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
