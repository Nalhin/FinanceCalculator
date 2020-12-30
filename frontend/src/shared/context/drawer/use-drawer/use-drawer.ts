import { UseDisclosureReturn } from '@chakra-ui/react';
import React from 'react';

export const DrawerContext = React.createContext<null | UseDisclosureReturn>(
  null,
);

export const useDrawer = () => {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error(`useDrawer must be used within a DrawerProvider`);
  }
  return context;
};
