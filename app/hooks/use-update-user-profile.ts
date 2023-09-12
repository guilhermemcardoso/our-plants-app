import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { updateUserProfile as updateUserProfileMutation } from '~/services/api/resources/user';
import { setKey } from '~/services/secure-storage';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { User } from '~/shared/types';
import { useAuthStore } from '~/store/auth-store';

export function useUpdateUserProfile() {
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
    data: updateUserProfileResponse,
  } = useMutation({
    mutationFn: updateUserProfileMutation,
  });
  useEffect(() => {
    if (!updateUserProfileResponse) {
      return;
    }

    const { response, status } = updateUserProfileResponse;
    if (!done.current && response.data && currentUser) {
      done.current = true;
      const updatedCurrentUser = {
        ...response.data,
        mapped_plants: currentUser.mapped_plants,
      };
      setCurrentUser(updatedCurrentUser);
      setKey(EncryptedKeys.CURRENT_USER, JSON.stringify(updatedCurrentUser));
      setOnResponse({ status: status || 500, data: response.data });
    }
  }, [updateUserProfileResponse, setCurrentUser, currentUser]);

  const updateUserProfile = async (userData: User) => {
    mutate(userData);
    done.current = false;
  };

  return { isLoading, updateUserProfile, onResponse };
}
