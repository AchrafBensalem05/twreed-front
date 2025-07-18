import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/auth';

/**
 * Custom hook to access and update authentication state (user)
 */
export function useAuth() {
  const [user, setUser] = useAtom(userAtom);

  return {
    user,
    setUser,
  };
} 