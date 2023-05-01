import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ForgotPassword,
  SignIn,
  SignUp,
  EmailConfirmation,
} from '~/domains/auth';

export type UnsignedStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  EmailConfirmation: { email: string };
};

const Stack = createNativeStackNavigator<UnsignedStackParamList>();

const screenOptions = { headerShown: false };

const Unsigned = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmation} />
    </Stack.Navigator>
  );
};

export default Unsigned;
