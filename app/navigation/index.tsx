import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signed, Unsigned } from './stacks';
import { NavigationContainer } from '@react-navigation/native';
import { Loading } from '~/presentation/screens';

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

const Router = () => {
  const isSignedIn = true;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {!isSignedIn ? Signed : Unsigned}
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
