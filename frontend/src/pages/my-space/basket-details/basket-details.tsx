import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getInvestmentsByBasket } from '../../../core/api/investment/investment.api';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import AddInvestmentModal from './add-investment-modal/add-investment-modal';
import InvestmentListItem from './investment-item/investment-item';
import { FaPlus } from 'react-icons/fa';
import DeleteInvestmentModal from './delete-investment-modal/delete-investment-modal';
import EditInvestmentModal from './edit-investment-modal/edit-investment-modal';
import BasketSummary from './basket-summary/basket-summary';

const BasketDetails = () => {
  const { basketId } = useParams<{ basketId: string }>();
  const modal = useDisclosure({ defaultIsOpen: false });
  const [toEditId, setToEditId] = React.useState<null | number>(null);
  const [toDeleteId, setToDeleteId] = React.useState<null | number>(null);

  const { data = [], refetch } = useQuery(
    ['baskets', basketId],
    () => getInvestmentsByBasket(Number(basketId)),
    {
      select: (response) => response.data,
    },
  );

  const setToEdit = React.useCallback((investmentId: number) => {
    setToEditId(investmentId);
  }, []);

  const setToDelete = React.useCallback((investmentId: number) => {
    setToDeleteId(investmentId);
  }, []);

  return (
    <Box>
      <Heading textAlign="center" mb={6}>
        Basket summary
      </Heading>
      <BasketSummary investments={data} />
      <EditInvestmentModal
        basketId={Number(basketId)}
        investment={data.find((inv) => inv.id === toEditId)}
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
        isOpen={modal.isOpen}
        onAdd={refetch}
        onClose={modal.onClose}
      />
      <Flex justify="center" align="center" direction="column">
        {data.map((investment) => (
          <InvestmentListItem
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
        onClick={modal.onOpen}
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
