import React from 'react';
import { User, UserProperties } from '../../../models/user/user';

export const AuthContext = React.createContext<AuthContextProps | null>(null);

export interface AuthContextProps {
  authenticateUser: (
    { user, token }: { user: UserProperties; token: string },
    config?: { onAuth?: (user: User) => void },
  ) => void;
  logoutUser: () => void;
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};
