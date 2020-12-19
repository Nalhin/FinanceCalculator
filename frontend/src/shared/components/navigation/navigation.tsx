import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../pages/main.routes';

const Navigation = () => {
  return (
    <Flex as={'nav'} mx="10%">
      <Box
        as={Link}
        to={MAIN_ROUTES.HOME}
        textColor="blue.400"
        fontSize="xl"
        fontWeight="bold"
        my={4}
        mr={8}
      >
        Home
      </Box>
      <Box
        as={Link}
        to={MAIN_ROUTES.CALCULATOR}
        textColor="blue.400"
        fontWeight="bold"
        fontSize="xl"
        my={4}
        mx={8}
      >
        Calculator
      </Box>
      <Box
        as={Link}
        to={MAIN_ROUTES.MY_SPACE}
        textColor="blue.400"
        fontWeight="bold"
        fontSize="xl"
        my={4}
        mx={8}
      >
        My space
      </Box>
    </Flex>
  );
};

export default Navigation;
