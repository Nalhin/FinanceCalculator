import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Main } from './pages/main';

export const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <CSSReset />
        <Main />
      </ChakraProvider>
    </Router>
  );
};
