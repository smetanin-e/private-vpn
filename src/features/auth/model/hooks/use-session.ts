'use client';

import { useSession } from 'next-auth/react';

export const useUserSession = () => {
  const { data, status } = useSession();
  const user = data && data.user;
  return { user, isLoading: status === 'loading' };
};
