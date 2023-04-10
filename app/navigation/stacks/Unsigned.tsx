import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  EmailConfirmation,
  ForgotPassword,
  SignIn,
  SignUp,
} from '~/domains/auth';

export type UnsignedStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  EmailConfirmation: undefined;
};

const Stack = createNativeStackNavigator<UnsignedStackParamList>();

const screenOptions = { headerShown: false };

const Unsigned = (
  <Stack.Group screenOptions={screenOptions}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="EmailConfirmation" component={EmailConfirmation} />
  </Stack.Group>
);

export default Unsigned;
