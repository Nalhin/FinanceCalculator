import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getInvestmentsByBasket } from '../../../core/api/investment/investment.api';
import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import AddInvestmentModal from './add-investment-modal/add-investment-modal';

const BasketDetails = () => {
  const { basketId } = useParams<{ basketId: string }>();
  const modal = useDisclosure({ defaultIsOpen: false });

  const { data = [] } = useQuery(
    ['baskets', basketId],
    () => getInvestmentsByBasket(Number(basketId)),
    {
      select: (response) => response.data,
    },
  );

  return (
    <Box>
      <Heading>Basket summary</Heading>
      <Button onClick={modal.onOpen}>Add an investment</Button>
      <AddInvestmentModal
        basketId={Number(basketId)}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
      <Box>
        {data.map((investment) => (
          <div key={investment.id}>{investment.id}</div>
        ))}
      </Box>
    </Box>
  );
};

export default BasketDetails;
