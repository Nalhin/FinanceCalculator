import {
  AnonymousUser,
  AuthenticatedUser,
  User,
  UserProperties,
} from '../../../models/user/user';
import React from 'react';
import { cookies } from '../../../models/cookies/app-cookies';
import { getMe } from '../../../../core/api/me/me.api';

export const useAuthState = (defaultUser: User = new AnonymousUser()) => {
  const [user, setUser] = React.useState<User>(defaultUser);
  const [isLoading, setIsLoading] = React.useState(true);

  const authenticateUser = React.useCallback(
    (
      { user, token }: { user: UserProperties; token: string },
      options: { onAuth?: (user: User) => void } = {},
    ) => {
      cookies.setAuthCookie(token);
      const authUser = new AuthenticatedUser(user);
      setUser(authUser);
      options.onAuth?.(authUser);
    },
    [],
  );

  const logoutUser = React.useCallback(() => {
    cookies.removeAuthCookie();
    setUser(new AnonymousUser());
  }, []);

  React.useEffect(() => {
    (async () => {
      const token = cookies.getAuthCookie();
      if (token) {
        try {
          const resp = await getMe();
          setUser(new AuthenticatedUser(resp.data));
        } catch (e) {
          cookies.removeAuthCookie();
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return { authenticateUser, user, logoutUser, isLoading };
};
