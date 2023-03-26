import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Favorites, Map, Profile, Settings } from '~/presentation/screens';
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
      <Tab.Screen name={Tabs.MAP} component={Map} />
      <Tab.Screen name={Tabs.FAVORITES} component={Favorites} />
      <Tab.Screen name={Tabs.PROFILE} component={Profile} />
      <Tab.Screen name={Tabs.SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
};

export default Home;
