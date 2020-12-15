import React from 'react';
import { AnonymousUser, AuthenticatedUser } from '../../../models/user/user';
import { useAuthState } from '../use-auth-state/use-auth-state';
import { AuthContext } from '../use-auth/use-auth';
import { UserContext } from '../use-user/use-user';

interface Props {
  defaultUser?: AnonymousUser | AuthenticatedUser;
}

export const AuthProvider: React.FC<Props> = ({
  children,
  defaultUser = new AnonymousUser(),
} = {}) => {
  const { isLoading, user, authenticateUser, logoutUser } = useAuthState(
    defaultUser,
  );

  return (
    <UserContext.Provider value={{ user }}>
      <AuthContext.Provider value={{ authenticateUser, logoutUser }}>
        {!isLoading ? children : null}
      </AuthContext.Provider>
    </UserContext.Provider>
  );
};
