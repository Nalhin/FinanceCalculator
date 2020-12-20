import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  createdDate: string;
  name: string;
  to: string;
}

const BasketItem = ({ createdDate, name, to }: Props) => {
  return (
    <Link to={to}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box>{name}</Box>
        <Flex justifySelf="flex-end">{createdDate}</Flex>
      </Box>
    </Link>
  );
};

export default BasketItem;
