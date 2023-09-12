import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import storage from '@react-native-firebase/storage';
import { updateProfileImage as updateProfileImageMutation } from '~/services/api/resources/user';
import { setKey } from '~/services/secure-storage';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { useAuthStore } from '~/store/auth-store';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export function useUpdateProfileImage() {
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
    data: updateProfileImageResponse,
  } = useMutation({
    mutationFn: updateProfileImageMutation,
  });
  useEffect(() => {
    if (!updateProfileImageResponse) {
      return;
    }

    const { response, status } = updateProfileImageResponse;
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
  }, [updateProfileImageResponse, setCurrentUser, currentUser]);

  const updateProfileImage = async (imageUri: string) => {
    try {
      const imageId = uuid();
      const reference = storage().ref(imageId);

      await reference.putFile(imageUri);
      const url = await storage().ref(imageId).getDownloadURL();
      mutate(url);
      done.current = false;
    } catch (error) {
      console.log(
        '[useUpdateProfileImage] - update profile image error',
        error
      );
    }
  };

  return { isLoading, updateProfileImage, onResponse };
}
