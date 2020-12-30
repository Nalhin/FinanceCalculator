import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getInvestmentsByBasket } from '../../../core/api/investment/investment.api';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import AddInvestmentModal from '../../../shared/components/investment/add-investment-modal/add-investment-modal';
import InvestmentListItem from './investment-item/investment-item';
import { FaPlus } from 'react-icons/fa';
import DeleteInvestmentModal from '../../../shared/components/investment/delete-investment-modal/delete-investment-modal';
import EditInvestmentModal from '../../../shared/components/investment/edit-investment-modal/edit-investment-modal';
import BasketSummary from './basket-summary/basket-summary';

const BasketDetails = () => {
  const { basketId } = useParams<{ basketId: string }>();
  const addInvestmentModal = useDisclosure({ defaultIsOpen: false });
  const [toEditId, setToEditId] = React.useState<null | number>(null);
  const [toDeleteId, setToDeleteId] = React.useState<null | number>(null);
  const { data, refetch, isLoading } = useQuery(
    ['baskets', basketId],
    () => getInvestmentsByBasket(Number(basketId)),
    {
      select: (response) => response.data,
    },
  );

  const investments = data?.content ?? [];

  const setToEdit = React.useCallback((investmentId: number) => {
    setToEditId(investmentId);
  }, []);

  const setToDelete = React.useCallback((investmentId: number) => {
    setToDeleteId(investmentId);
  }, []);

  return (
    <Box>
      <Heading textAlign="center" my={6}>
        Basket summary
      </Heading>
      <EditInvestmentModal
        basketId={Number(basketId)}
        investment={investments.find((inv) => inv.id === toEditId)}
        isOpen={Boolean(toEditId)}
        onEdit={refetch}
        onClose={() => setToEditId(null)}
      />
      <DeleteInvestmentModal
        isOpen={Boolean(toDeleteId)}
        onClose={() => setToDeleteId(null)}
        basketId={Number(basketId)}
        onDelete={refetch}
        investmentId={toDeleteId}
      />
      <AddInvestmentModal
        basketId={Number(basketId)}
        isOpen={addInvestmentModal.isOpen}
        onAdd={refetch}
        onClose={addInvestmentModal.onClose}
      />
      {investments.length > 0 || isLoading ? (
        <BasketSummary investments={investments} />
      ) : (
        <Flex justify="center" direction="column" align="center">
          <Box textAlign="center" fontWeight="bold" fontSize="2xl">
            No investments
          </Box>
          <Button onClick={addInvestmentModal.onOpen} colorScheme="teal" mt={2}>
            Add an investment
          </Button>
        </Flex>
      )}
      <Flex justify="center" align="center" direction="column">
        {investments.length > 0 && (
          <Box textAlign="center" fontWeight="bold" fontSize="2xl" my={2}>
            Investments
          </Box>
        )}
        {investments.map((investment) => (
          <InvestmentListItem
            basketId={Number(basketId)}
            onDelete={setToDelete}
            onEdit={setToEdit}
            investment={investment}
            key={investment.id}
          />
        ))}
      </Flex>
      <IconButton
        width={12}
        height={12}
        colorScheme="teal"
        onClick={addInvestmentModal.onOpen}
        icon={<FaPlus />}
        aria-label="add an investment"
        rounded="full"
        position="fixed"
        bottom={4}
        right={20}
      />
    </Box>
  );
};

export default BasketDetails;
