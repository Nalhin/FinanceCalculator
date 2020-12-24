import React from 'react';
import { useForm } from 'react-hook-form';
import { DEFAULT_INVESTMENT_CONFIG } from '../../../../shared/constants/default-investment-config';
import { SaveInvestmentDto } from '../../../../core/api/api.interface';
import {
  Box,
  Button,
  FormControl,
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
import InvestmentConfigFormControlGroup from '../../../../shared/components/forms/investment-config-form-control-group/investment-config-form-control-group';
import { useMutation } from 'react-query';
import { saveInvestment } from '../../../../core/api/investment/investment.api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  annualInterestRate: yup.number().min(0),
  compoundFrequency: yup.number().min(0),
  payment: yup.number().min(0),
  paymentFrequency: yup.number().min(0),
  startAmount: yup.number().min(0),
  yearsOfGrowth: yup.number().min(0),
  risk: yup.string().required('Risk is required'),
  category: yup.string().required('Category is required'),
});

const DEFAULT_FORM_VALUES: SaveInvestmentDto = {
  ...DEFAULT_INVESTMENT_CONFIG,
  category: '',
  risk: '',
};

interface Props {
  basketId: number;
  isOpen: boolean;
  onClose: () => void;
}

const AddInvestmentModal = ({ basketId, isOpen, onClose }: Props) => {
  const { control, register, handleSubmit, reset } = useForm<SaveInvestmentDto>(
    {
      defaultValues: DEFAULT_FORM_VALUES,
      resolver: yupResolver(schema),
    },
  );
  const { mutate, isLoading } = useMutation(
    (variables: SaveInvestmentDto) => saveInvestment(variables, basketId),
    {
      onSuccess: () => {
        reset();
      },
    },
  );

  const sendForm = (form: SaveInvestmentDto) => {
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
            <FormControl>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Input id="category" name="category" ref={register} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="risk">Risk level</FormLabel>
              <Input id="risk" name="risk" ref={register} />
            </FormControl>
            <InvestmentConfigFormControlGroup control={control} />
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
