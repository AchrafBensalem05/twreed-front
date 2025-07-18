import { useAtom } from 'jotai';
import { userAtom, tokenAtom } from '@/atoms/auth';

/**
 * Custom hook to access and update authentication state (user and token)
 */
export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  return {
    user,
    setUser,
    token,
    setToken,
    isAuthenticated: Boolean(token),
  };
} 