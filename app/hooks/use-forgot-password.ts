import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ForgotPasswordData } from '~/domains/auth/types';

import { forgotPassword as forgotPasswordMutation } from '~/services/api/resources/auth';

export function useForgotPassword() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });

  const {
    mutate,
    isLoading,
    data: resendResponse,
  } = useMutation({
    mutationFn: forgotPasswordMutation,
  });
  useEffect(() => {
    if (!resendResponse) {
      return;
    }

    const { response, status } = resendResponse;
    setOnResponse({ status, data: response.data });
  }, [resendResponse]);

  const forgotPassword = async ({ email }: ForgotPasswordData) => {
    mutate({ email });
  };

  return { isLoading, forgotPassword, onResponse };
}
