import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const renderWithProviders = (ui: JSX.Element) => {
  const queryClient = new QueryClient();

  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>{ui}</ChakraProvider>
      </QueryClientProvider>,
    ),
  };
};
