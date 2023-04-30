import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getCurrentUser as getCurrentUserMutation } from '~/services/api/resources/user';
import { setKey } from '~/services/secure-storage';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { useAuthStore } from '~/store/auth-store';

export function useGetCurrentUser() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const {
    mutate,
    isLoading,
    data: getCurrentUserResponse,
  } = useMutation({
    mutationFn: getCurrentUserMutation,
  });
  useEffect(() => {
    if (!getCurrentUserResponse) {
      return;
    }

    const { response, status } = getCurrentUserResponse;
    setOnResponse({ status, data: response.data });
    if (response.data && response.data.user) {
      const { user } = response.data;
      setKey(EncryptedKeys.CURRENT_USER, JSON.stringify(user));

      setCurrentUser(user);
    }
  }, [getCurrentUserResponse, setCurrentUser]);

  const getCurrentUser = async () => {
    mutate();
  };

  return { isLoading, getCurrentUser, onResponse };
}
