import React, { useLayoutEffect, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signed, Unsigned } from './stacks';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '~/domains/loading';
import { useAuthStore } from '~/store/auth-store';
import { useCheckCurrentUser } from '~/hooks/use-check-current-user';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

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

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {isSignedIn ? Signed : Unsigned}
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
