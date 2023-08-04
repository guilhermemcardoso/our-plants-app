import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from '~/navigation/tabs';
import { Routes } from '../routes';
import { EditProfile } from '~/domains/profile';
import { useGetSpecies } from '~/hooks/use-get-species';
import { Complaint, Plant, Specie } from '~/shared/types';
import { CreateEditPlant, VisualizePlant } from '~/domains/plant';
import { CreateEditSpecie } from '~/domains/specie';
import {
  CreateEditComplaint,
  EvaluateComplaint,
  MyComplaints,
} from '~/domains/complaints';

const screenOptions = { headerShown: false };

export type SignedInStackParamList = {
  [Routes.HOME]: undefined;
  [Routes.EDIT_PROFILE]: undefined;
  [Routes.MAP]: undefined;
  [Routes.FAVORITES]: undefined;
  [Routes.COMPLAINTS]: undefined;
  [Routes.USER_PROFILE]: undefined;
  [Routes.SETTINGS]: undefined;
  [Routes.CREATE_EDIT_PLANT]: {
    plant?: Plant;
  };
  [Routes.MY_COMPLAINTS]: undefined;
  [Routes.CREATE_EDIT_COMPLAINT]: {
    complaint?: Complaint;
  };
  [Routes.EVALUATE_COMPLAINT]: {
    complaint?: Complaint;
  };
  [Routes.VISUALIZE_PLANT]: undefined;
  [Routes.CREATE_EDIT_SPECIE]: {
    specie?: Specie;
  };
};

const RootStack = createNativeStackNavigator<SignedInStackParamList>();

const Signed = () => {
  const { getSpecies } = useGetSpecies();

  useEffect(() => {
    getSpecies();
  }, [getSpecies]);

  return (
    <RootStack.Navigator screenOptions={screenOptions}>
      <RootStack.Screen name={Routes.HOME} component={TabNavigator} />
      <RootStack.Screen name={Routes.EDIT_PROFILE} component={EditProfile} />
      <RootStack.Screen
        name={Routes.CREATE_EDIT_PLANT}
        component={CreateEditPlant}
      />
      <RootStack.Screen
        name={Routes.VISUALIZE_PLANT}
        component={VisualizePlant}
      />
      <RootStack.Screen name={Routes.MY_COMPLAINTS} component={MyComplaints} />
      <RootStack.Screen
        name={Routes.CREATE_EDIT_COMPLAINT}
        component={CreateEditComplaint}
      />
      <RootStack.Screen
        name={Routes.EVALUATE_COMPLAINT}
        component={EvaluateComplaint}
      />
      <RootStack.Screen
        name={Routes.CREATE_EDIT_SPECIE}
        component={CreateEditSpecie}
      />
    </RootStack.Navigator>
  );
};

export default Signed;
