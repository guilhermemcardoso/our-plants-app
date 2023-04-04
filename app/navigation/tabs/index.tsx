import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoriteList } from '~/domains/favorites';
import { MapScreen } from '~/domains/map';
import { UserProfile } from '~/domains/profile';
import { SettingsList } from '~/domains/settings';
import { TabBar } from './components';
import { Tabs } from './constants';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name={Tabs.MAP} component={MapScreen} />
      <Tab.Screen name={Tabs.FAVORITES} component={FavoriteList} />
      <Tab.Screen name={Tabs.PROFILE} component={UserProfile} />
      <Tab.Screen name={Tabs.SETTINGS} component={SettingsList} />
    </Tab.Navigator>
  );
};

export default Home;
