import React from 'react';
import notFound from '../../assets/not-found.jpg';
import { Flex, Image } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Flex align="center" justify="center">
      <Flex w={{ base: '100%', md: '60%', lg: '40%', xl: '30%' }}>
        <Image src={notFound} alt="Not Found" />
      </Flex>
    </Flex>
  );
};

export default NotFound;
