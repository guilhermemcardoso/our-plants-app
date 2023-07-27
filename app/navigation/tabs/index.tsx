import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoriteList } from '~/domains/favorites';
import { MapScreen } from '~/domains/map';

import { SettingsList } from '~/domains/settings';
import { TabBar } from './components';
import { Tabs } from './constants';
import { UserProfile } from '~/domains/profile';
import { ComplaintList } from '~/domains/complaints';
import { useAuthStore } from '~/store/auth-store';
import { ADMIN_LEVEL } from '~/shared/constants/constants';

export type MainStackParamList = {
  [Tabs.MAP]: undefined;
  [Tabs.FAVORITES]: undefined;
  [Tabs.COMPLAINTS]: undefined;
  [Tabs.USER_PROFILE]: undefined;
  [Tabs.SETTINGS]: undefined;
};

const MainStack = createBottomTabNavigator<MainStackParamList>();

const TabNavigator = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAdmin = useMemo(() => {
    return currentUser && currentUser?.score.level >= ADMIN_LEVEL;
  }, [currentUser]);

  return (
    <MainStack.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <MainStack.Screen name={Tabs.MAP} component={MapScreen} />
      <MainStack.Screen name={Tabs.FAVORITES} component={FavoriteList} />
      {isAdmin && (
        <MainStack.Screen name={Tabs.COMPLAINTS} component={ComplaintList} />
      )}
      <MainStack.Screen name={Tabs.USER_PROFILE} component={UserProfile} />
      <MainStack.Screen name={Tabs.SETTINGS} component={SettingsList} />
    </MainStack.Navigator>
  );
};

export default TabNavigator;
