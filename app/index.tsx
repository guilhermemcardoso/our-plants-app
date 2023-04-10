import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from '~/navigation';
import { useSettingsStore } from './store/settings-store';
import { themes } from './theme';

const App = () => {
  const loadSettings = useSettingsStore((state) => state.loadSettings);
  useEffect(() => {
    loadSettings();
    SplashScreen.hide();
  });

  return <Router />;
};

const AppWrapper = () => {
  const theme = useSettingsStore((state) => state.theme);
  const queryClient = new QueryClient();
  return (
    <NativeBaseProvider theme={themes[theme]}>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          translucent
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <App />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default AppWrapper;
