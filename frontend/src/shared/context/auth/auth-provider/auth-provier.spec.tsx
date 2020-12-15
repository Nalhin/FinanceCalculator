import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from './auth-provider';
import { useAuthState } from '../use-auth-state/use-auth-state';
import { mocked } from 'ts-jest/utils';

jest.mock('../use-auth-state/use-auth-state');

describe('AuthProvider', () => {
  it('should block rendering when user is being fetched', async () => {
    mocked(useAuthState).mockReturnValue({
      isLoading: true,
    } as ReturnType<typeof useAuthState>);

    const { queryByText } = render(
      <AuthProvider>
        <div>test</div>
      </AuthProvider>,
    );
    expect(queryByText(/test/)).not.toBeInTheDocument();
  });

  it('should render children after user is fetched', () => {
    mocked(useAuthState).mockReturnValue({
      isLoading: false,
    } as ReturnType<typeof useAuthState>);

    const { getByText } = render(
      <AuthProvider>
        <div>test</div>
      </AuthProvider>,
    );

    expect(getByText(/test/)).toBeInTheDocument();
  });
});
