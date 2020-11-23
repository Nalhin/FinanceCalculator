import React from 'react';
import { Heading, Button, Image, Flex, Box } from '@chakra-ui/react';
import accounting from '../../assets/accounting.jpg';

const Home = () => {
  return (
    <Flex height="calc(100vh - 62px)" flexDir={{ base: 'column', lg: 'row' }}>
      <Flex w={{ base: '100%', lg: '50%' }} justify="center" align="center">
        <Box w={{ base: '100%', lg: '60%' }} mx={8}>
          <Heading as="h1" size="3xl" color="blue.400" my={2}>
            Invest with ease!
          </Heading>
          <Box>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas
            magna et viverra facilisis. Donec orci purus, porttitor et massa
            sed, lacinia vehicula mi. Ut rhoncus ullamcorper sapien eleifend
            pellentesque. Quisque nec feugiat dui, eget faucibus velit. Donec
            sollicitudin lacus id ornare luctus.
          </Box>
          <Button colorScheme="blue" my={2}>
            Learn more
          </Button>
        </Box>
      </Flex>
      <Flex w={{ base: '100%', lg: '50%' }} justify="center" align="center">
        <Image src={accounting} />
      </Flex>
    </Flex>
  );
};

export default Home;
