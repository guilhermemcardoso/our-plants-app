import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SignUpData } from '~/domains/auth/types';

import { signUp as signUpMutation } from '~/services/api/resources/auth';

export function useSignUp() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });

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
    setOnResponse({ status, data: response.data });
  }, [signUpResponse]);

  const signUp = async ({
    email,
    password,
    repassword,
    name,
    lastname,
  }: SignUpData) => {
    mutate({ email, password, repassword, name, lastname });
  };

  return { isLoading, signUp, onResponse };
}
