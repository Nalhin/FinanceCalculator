import React from 'react';
import { useQuery } from 'react-query';
import { getInvestmentById } from '../../../core/api/investment/investment.api';
import { useHistory, useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Spinner,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import InvestmentStatsSummary from '../../../shared/components/investment/investment-stats-summary/investment-stats-summary';
import EditInvestmentModal from '../../../shared/components/investment/edit-investment-modal/edit-investment-modal';
import DeleteInvestmentModal from '../../../shared/components/investment/delete-investment-modal/delete-investment-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import InvestmentSummary from '../../../shared/components/investment/investment-summary/investment-summary';
import InvestmentDetailsTable from './investment-details-table';
import type { AxiosError } from 'axios';
import { onAxiosError } from '../../../shared/utils/on-axios-error/on-axios-error';
import { MAIN_ROUTES } from '../../main.routes';

const InvestmentDetails = () => {
  const { basketId, investmentId } = useParams<{
    investmentId: string;
    basketId: string;
  }>();
  const history = useHistory();
  const toast = useToast();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const { data, isLoading, refetch } = useQuery(
    ['investments', basketId, investmentId],
    () => getInvestmentById(Number(basketId), Number(investmentId)),
    {
      onError: (error: AxiosError) =>
        onAxiosError(error, {
          404: () => {
            history.push(MAIN_ROUTES.MY_SPACE);
            toast({
              title: 'Investment not found',
              description: 'Investment was not found',
              status: 'error',
            });
          },
          '*': () =>
            toast({
              title: 'Error',
              description: 'Unexpected error occurred',
              status: 'error',
            }),
        }),
      select: (response) => response.data,
    },
  );

  if (isLoading || !data) {
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Box mb={6}>
      <EditInvestmentModal
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        onEdit={refetch}
        basketId={Number(basketId)}
        investment={data}
      />
      <DeleteInvestmentModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onDelete={history.goBack}
        basketId={Number(basketId)}
        investmentId={data.id}
      />
      <Flex width={{ base: '90%', lg: '50%' }} direction="column" mx="auto">
        <InvestmentStatsSummary config={data} />
        <InvestmentDetailsTable investment={data} />
      </Flex>
      <InvestmentSummary investment={data} />
      <IconButton
        width={12}
        height={12}
        colorScheme="teal"
        onClick={editModal.onOpen}
        icon={<FaEdit />}
        aria-label="edit an investment"
        rounded="full"
        position="fixed"
        bottom={4}
        right={20}
      />
      <IconButton
        width={12}
        height={12}
        colorScheme="teal"
        onClick={deleteModal.onOpen}
        icon={<FaTrash />}
        aria-label="delete an investment"
        rounded="full"
        position="fixed"
        bottom={4}
        left={4}
      />
    </Box>
  );
};

export default InvestmentDetails;
