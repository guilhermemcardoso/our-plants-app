import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from '~/navigation/tabs';
import { Routes } from '../routes';
import { EditProfile } from '~/domains/profile';

const screenOptions = { headerShown: false };

export type SignedInStackParamList = {
  [Routes.HOME]: undefined;
  [Routes.EDIT_PROFILE]: undefined;
  [Routes.MAP]: undefined;
  [Routes.FAVORITES]: undefined;
  [Routes.USER_PROFILE]: undefined;
  [Routes.SETTINGS]: undefined;
};

const RootStack = createNativeStackNavigator<SignedInStackParamList>();

const Signed = () => {
  return (
    <RootStack.Navigator screenOptions={screenOptions}>
      <RootStack.Screen name={Routes.HOME} component={TabNavigator} />
      <RootStack.Screen name={Routes.EDIT_PROFILE} component={EditProfile} />
    </RootStack.Navigator>
  );
};

export default Signed;
