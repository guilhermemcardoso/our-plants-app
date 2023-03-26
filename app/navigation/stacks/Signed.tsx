import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '~/navigation/tabs';

const Stack = createNativeStackNavigator();

const screenOptions = { headerShown: false };

const Signed = (
  <Stack.Group screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Group>
);

export default Signed;
