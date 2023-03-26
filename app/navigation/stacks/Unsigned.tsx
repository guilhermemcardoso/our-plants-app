import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, SignUp } from '~/presentation/screens';

const Stack = createNativeStackNavigator();

const screenOptions = { headerShown: false };

const Unsigned = (
  <Stack.Group screenOptions={screenOptions}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Group>
);

export default Unsigned;
