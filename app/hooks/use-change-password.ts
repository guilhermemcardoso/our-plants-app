import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { changePassword as changePasswordMutation } from '~/services/api/resources/user';

export function useChangePassword() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const done = useRef(true);

  const {
    mutate,
    isLoading,
    data: changePasswordResponse,
  } = useMutation({
    mutationFn: changePasswordMutation,
  });
  useEffect(() => {
    if (!changePasswordResponse) {
      return;
    }

    const { response, status } = changePasswordResponse;
    if (!done.current && response.data) {
      done.current = true;
      setOnResponse({ status: status || 500, data: response.data });
    }
  }, [changePasswordResponse]);

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      mutate({ oldPassword, newPassword });
      done.current = false;
    } catch (error) {
      console.log('[changePassword] - change password error', error);
    }
  };

  return { isLoading, changePassword, onResponse };
}
