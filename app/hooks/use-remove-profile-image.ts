import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { removeProfileImage as removeProfileImageMutation } from '~/services/api/resources/user';
import { setKey } from '~/services/secure-storage';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { useAuthStore } from '~/store/auth-store';

export function useRemoveProfileImage() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const currentUser = useAuthStore((state) => state.currentUser);
  const done = useRef(true);

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
    if (!done.current && response.data && currentUser) {
      done.current = true;
      const updatedCurrentUser = { ...currentUser, profile_image: undefined };
      setCurrentUser(updatedCurrentUser);
      setKey(EncryptedKeys.CURRENT_USER, JSON.stringify(updatedCurrentUser));
      setOnResponse({ status: status || 500, data: response.data });
    }
  }, [removeProfileImageResponse, setCurrentUser, currentUser]);

  const removeProfileImage = async () => {
    mutate();
    done.current = false;
  };

  return { isLoading, removeProfileImage, onResponse };
}
