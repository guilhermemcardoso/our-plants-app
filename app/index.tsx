import Router from '~/navigation';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
      <Router />
    </NativeBaseProvider>
  );
};

export default App;
