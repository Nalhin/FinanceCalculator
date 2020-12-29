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
import InvestmentChart from '../../../shared/components/investment/investment-chart';
import { calculateJoinedInterestTimeSeries } from '../../../shared/models/interest-calculator/calculate-joined-interest-time-series/calculate-joined-interest-time-series';
import { FaPlus } from 'react-icons/fa';
import InvestmentCategoryChart from '../../../shared/components/investment/investment-category-chart';
import DeleteInvestmentModal from './delete-investment-modal/delete-investment-modal';
import EditInvestmentModal from './edit-investment-modal/edit-investment-modal';
import InvestmentRiskChart from '../../../shared/components/investment/investment-risk-chart';

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

  const joinedSeries = React.useMemo(
    () => calculateJoinedInterestTimeSeries(data),
    [data],
  );

  const setToEdit = React.useCallback((investmentId: number) => {
    setToEditId(investmentId);
  }, []);

  const setToDelete = React.useCallback((investmentId: number) => {
    setToDeleteId(investmentId);
  }, []);

  return (
    <Box>
      <Heading>Basket summary</Heading>
      {data.length > 0 ? (
        <Box width="90%" mx="auto">
          <InvestmentChart series={joinedSeries} />
          <Flex
            flexDirection={{ base: 'column', lg: 'row' }}
            align="center"
            justify="center"
          >
            <InvestmentCategoryChart investments={data} />
            <InvestmentRiskChart investments={data} />
          </Flex>
        </Box>
      ) : (
        <Box>No investments</Box>
      )}
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
        right={4}
      />
    </Box>
  );
};

export default BasketDetails;
