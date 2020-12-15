import { User } from '../../../models/user/user';
import React from 'react';

export interface UserContextProps {
  user: User;
}

export const UserContext = React.createContext<null | UserContextProps>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a AuthProvider`);
  }
  return context;
};
