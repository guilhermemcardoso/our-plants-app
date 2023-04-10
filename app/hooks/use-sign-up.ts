import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SignUpData } from '~/domains/auth/types';

import { signUp as signUpMutation } from '~/services/api/resources/auth';
import { setKey } from '~/services/secure-storage';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { useAuthStore } from '~/store/auth-store';

export function useSignUp() {
  const [responseStatus, setResponseStatus] = useState<number>();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const {
    mutate,
    isLoading,
    data: signUpResponse,
  } = useMutation({
    mutationFn: signUpMutation,
  });
  useEffect(() => {
    if (!signUpResponse) {
      return;
    }

    const { response, status } = signUpResponse;
    setResponseStatus(status);
    if (
      response.data &&
      response.data.user &&
      response.data.access_token &&
      response.data.refresh_token
    ) {
      const { user, access_token, refresh_token } = response.data;
      setKey(EncryptedKeys.CURRENT_USER, JSON.stringify(user));
      setKey(EncryptedKeys.ACCESS_TOKEN, access_token);
      setKey(EncryptedKeys.REFRESH_TOKEN, refresh_token);

      setCurrentUser(user);
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    }
  }, [signUpResponse, setCurrentUser, setAccessToken, setRefreshToken]);

  const signUp = async ({
    email,
    password,
    repassword,
    name,
    lastname,
  }: SignUpData) => {
    mutate({ email, password, repassword, name, lastname });
  };

  return { isLoading, signUp, responseStatus };
}
