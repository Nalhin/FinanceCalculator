import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
  createdDate: string;
  name: string;
}

const BasketItem = ({ createdDate, name }: Props) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box>{name}</Box>
      <Flex justifySelf="flex-end">{createdDate}</Flex>
    </Box>
  );
};

export default BasketItem;
