import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../pages/main.routes';

const Navigation = () => {
  return (
    <Flex as="nav" justify="flex-start" ml={{ base: 8, lg: '10%' }}>
      <Box
        as={Link}
        to={MAIN_ROUTES.HOME}
        textColor="blue.400"
        fontSize={{ base: 'xl', lg: '2xl' }}
        fontWeight="bold"
        my={4}
        mr={{ base: 2, lg: 4 }}
      >
        Home
      </Box>
      <Box
        as={Link}
        to={MAIN_ROUTES.CALCULATOR}
        textColor="blue.400"
        fontWeight="bold"
        fontSize={{ base: 'xl', lg: '2xl' }}
        my={4}
        mx={{ base: 2, lg: 4 }}
      >
        Calculator
      </Box>
      <Box
        as={Link}
        to={MAIN_ROUTES.MY_SPACE}
        textColor="blue.400"
        fontWeight="bold"
        fontSize={{ base: 'xl', lg: '2xl' }}
        my={4}
        mx={{ base: 2, lg: 4 }}
      >
        My space
      </Box>
    </Flex>
  );
};

export default Navigation;
