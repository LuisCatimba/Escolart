//Hooks

import { useContext } from 'react';

//Contexto

import { ContextUser } from '../Context/ContextUser';

export const useAuth = () => {
  const context = useContext(ContextUser);

  if (!context) {
    throw new Error('Sem contexto');
  }

  const { user, setUser, admin, setAdmin, loading } = context;

  return { user, setUser, admin, setAdmin, loading };
};
