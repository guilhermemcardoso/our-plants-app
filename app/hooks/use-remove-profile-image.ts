import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { removeProfileImage as removeProfileImageMutation } from '~/services/api/resources/user';
import { useAuthStore } from '~/store/auth-store';

export function useRemoveProfileImage() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const {
    mutate,
    isLoading,
    data: removeProfileImageResponse,
  } = useMutation({
    mutationFn: removeProfileImageMutation,
  });
  useEffect(() => {
    if (!removeProfileImageResponse) {
      return;
    }

    const { response, status } = removeProfileImageResponse;
    setOnResponse({ status, data: response.data });
    if (response.data) {
      setCurrentUser(response.data);
    }
  }, [removeProfileImageResponse, setCurrentUser]);

  const removeProfileImage = async () => {
    mutate();
  };

  return { isLoading, removeProfileImage, onResponse };
}
