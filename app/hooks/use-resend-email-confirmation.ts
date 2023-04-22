import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ResendEmailConfirmationData } from '~/domains/auth/types';

import { resendEmailConfirmation as resendEmailConfirmationMutation } from '~/services/api/resources/auth';

export function useResendEmailConfirmation() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });

  const {
    mutate,
    isLoading,
    data: resendResponse,
  } = useMutation({
    mutationFn: resendEmailConfirmationMutation,
  });
  useEffect(() => {
    if (!resendResponse) {
      return;
    }

    const { response, status } = resendResponse;
    setOnResponse({ status, data: response.data });
  }, [resendResponse]);

  const resendEmailConfirmation = async ({
    email,
  }: ResendEmailConfirmationData) => {
    mutate({ email });
  };

  return { isLoading, resendEmailConfirmation, onResponse };
}
