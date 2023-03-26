import Router from '~/navigation';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
      <Router />
    </>
  );
};

export default App;
