import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

export const useAuth = () => {
  const { token, user, setToken, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAuthenticated = isMounted && !!token && !!user;

  return {
    isAuthenticated,
    user: isMounted ? user : null,
    token: isMounted ? token : null,
    setToken,
    logout,
  };
};