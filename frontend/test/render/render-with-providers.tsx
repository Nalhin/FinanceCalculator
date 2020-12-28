import React from 'react';
import { createMemoryHistory, History } from 'history';
import { Queries, render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Router } from 'react-router-dom';
import { AnonymousUser, User } from '../../src/shared/models/user/user';
import { AuthProvider } from '../../src/shared/context/auth/auth-provider/auth-provider';

interface CustomRenderOptions<Q extends Queries> extends RenderOptions<Q> {
  route?: string;
  history?: History;
  user?: User;
  path?: string;
}

export const renderWithProviders = <Q extends Queries>(
  ui: JSX.Element,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    user = new AnonymousUser(),
  }: CustomRenderOptions<Q> = {},
) => {
  const queryClient = new QueryClient();

  return {
    ...render(
      <AuthProvider defaultUser={user}>
        <Router history={history}>
          <QueryClientProvider client={queryClient}>
            <Route path={path}>
              <ChakraProvider>{ui}</ChakraProvider>
            </Route>
          </QueryClientProvider>
        </Router>
      </AuthProvider>,
    ),
    history,
    queryClient,
  };
};
