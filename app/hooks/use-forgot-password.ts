import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ForgotPasswordData } from '~/domains/auth/types';

import { forgotPassword as forgotPasswordMutation } from '~/services/api/resources/auth';
import { useAuthStore } from '~/store/auth-store';

export function useForgotPassword() {
  const [responseStatus, setResponseStatus] = useState<number>();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const {
    mutate,
    isLoading,
    data: forgotPasswordResponse,
  } = useMutation({
    mutationFn: forgotPasswordMutation,
  });
  useEffect(() => {
    if (!forgotPasswordResponse) {
      return;
    }

    const { status } = forgotPasswordResponse;
    setResponseStatus(status);
  }, [forgotPasswordResponse, setCurrentUser, setAccessToken, setRefreshToken]);

  const forgotPassword = async ({ email }: ForgotPasswordData) => {
    mutate({ email });
  };

  return { isLoading, forgotPassword, responseStatus };
}
