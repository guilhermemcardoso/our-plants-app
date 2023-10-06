import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from '~/navigation';
import { useSettingsStore } from './store/settings-store';
import { themes } from './theme';
import { useSettings } from './hooks/use-settings';
import { Alert, Loading } from './shared/components';
import { useLoading } from './hooks/use-loading';
import { useLocation } from './hooks/use-location';
import { AskForLocation } from './domains/location';
import useAppIsActive from './hooks/use-app-is-active';
import useNetInfo from './hooks/use-net-info';
import { useAlertStore } from './store/alert-store';

const App = () => {
  const { loadSettings } = useSettings();
  const { requestLocationPermission, isLocationAllowed } = useLocation();
  useAppIsActive(requestLocationPermission);
  const { checkInternetConnection } = useNetInfo();

  useEffect(() => {
    checkInternetConnection();
  }, [checkInternetConnection]);

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
  const showAlert = useAlertStore((state) => state.showAlert);
  const alertType = useAlertStore((state) => state.alertType);
  const alertTitle = useAlertStore((state) => state.alertTitle);
  const alertDescription = useAlertStore((state) => state.alertDescription);
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
        <Alert
          show={showAlert}
          status={alertType}
          title={alertTitle}
          description={alertDescription}
        />
        <App />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default AppWrapper;
