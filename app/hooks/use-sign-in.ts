import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SignInData } from '~/domains/auth/types';

import { signIn as signInMutation } from '~/services/api/resources/auth';
import { setKey } from '~/services/secure-storage';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { useAuthStore } from '~/store/auth-store';

export function useSignIn() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const {
    mutate,
    isLoading,
    data: signInResponse,
  } = useMutation({
    mutationFn: signInMutation,
  });
  useEffect(() => {
    if (!signInResponse) {
      return;
    }

    const { response, status } = signInResponse;
    setOnResponse({ status, data: response.data });
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
  }, [signInResponse, setCurrentUser, setAccessToken, setRefreshToken]);

  const signIn = async ({ email, password }: SignInData) => {
    mutate({ email, password });
  };

  return { isLoading, signIn, onResponse };
}
