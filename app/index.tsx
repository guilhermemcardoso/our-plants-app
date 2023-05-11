import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from '~/navigation';
import { useSettingsStore } from './store/settings-store';
import { themes } from './theme';
import { useSettings } from './hooks/use-settings';
import { Loading } from './shared/components';
import { useLoading } from './hooks/use-loading';
import { useLocation } from './hooks/use-location';
import { AskForLocation } from './domains/location';
import useAppIsActive from './hooks/use-app-is-active';

const App = () => {
  const { loadSettings } = useSettings();
  const { requestLocationPermission, isLocationAllowed } = useLocation();
  useAppIsActive(requestLocationPermission);

  useEffect(() => {
    loadSettings();
    SplashScreen.hide();
  });

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  if (isLocationAllowed) {
    return <Router />;
  }

  return <AskForLocation />;
};

const AppWrapper = () => {
  const theme = useSettingsStore((state) => state.theme);
  const { isLoading } = useLoading();
  const queryClient = new QueryClient();

  return (
    <NativeBaseProvider theme={themes[theme]}>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          translucent
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <Loading show={isLoading} />
        <App />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default AppWrapper;
