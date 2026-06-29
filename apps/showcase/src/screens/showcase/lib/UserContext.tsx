import { createContext, useContext } from 'react';
import type { User } from './auth';

interface UserContextValue {
  user: User;
  logout: () => void;
}

export const UserContext = createContext<UserContextValue | null>(null);

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser() must be used inside <UserContext.Provider>');
  }
  return ctx;
}
