import React, { useLayoutEffect, useMemo } from 'react';
import { Signed, Unsigned } from './stacks';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '~/store/auth-store';
import { useCheckCurrentUser } from '~/hooks/use-check-current-user';

const Router = () => {
  const { checkCurrentUser } = useCheckCurrentUser();
  const currentUser = useAuthStore((state) => state.currentUser);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isSignedIn = useMemo(() => {
    return currentUser && accessToken && refreshToken;
  }, [currentUser, accessToken, refreshToken]);

  useLayoutEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);

  const Route = isSignedIn ? Signed : Unsigned;

  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
};

export default Router;
