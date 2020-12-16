import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { useAuthState } from '../use-auth-state/use-auth-state';
import { authenticatedUserFactory } from '../../../../../test/factory/user/user';
import { AuthProvider } from '../auth-provider/auth-provider';
import { useUser } from './use-user';

jest.mock('../use-auth-state/use-auth-state');

describe('useUser', () => {
  it('should throw exception if not used within auth context', () => {
    const { result } = renderHook(() => useUser());

    expect(result.error).toBeTruthy();
  });

  it('should return auth context state', () => {
    const expectedUser = authenticatedUserFactory.buildOne();
    mocked(useAuthState).mockReturnValue({
      user: expectedUser,
    } as ReturnType<typeof useAuthState>);

    const { result } = renderHook(() => useUser(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    expect(result.current.user).toStrictEqual(expectedUser);
  });
});
