import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Main } from './pages/main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './shared/context/auth/auth-provider/auth-provider';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <CSSReset />
          <AuthProvider>
            <Main />
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </Router>
  );
};
