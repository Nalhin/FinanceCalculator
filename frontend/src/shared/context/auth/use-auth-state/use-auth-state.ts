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
  const [currUser, setCurrUser] = React.useState<User>(defaultUser);
  const [isLoading, setIsLoading] = React.useState(true);

  const authenticateUser = React.useCallback(
    (
      { user, token }: { user: UserProperties; token: string },
      options: { onAuth?: (user: User) => void } = {},
    ) => {
      cookies.setAuthCookie(token);
      const authUser = new AuthenticatedUser(user);
      setCurrUser(authUser);
      options.onAuth?.(authUser);
    },
    [],
  );

  const logoutUser = React.useCallback(() => {
    cookies.removeAuthCookie();
    setCurrUser(new AnonymousUser());
  }, []);

  React.useEffect(() => {
    void (async () => {
      const token = cookies.getAuthCookie();
      if (token) {
        try {
          const resp = await getMe();
          setCurrUser(new AuthenticatedUser(resp.data));
        } catch (e) {
          cookies.removeAuthCookie();
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return { authenticateUser, user: currUser, logoutUser, isLoading };
};
