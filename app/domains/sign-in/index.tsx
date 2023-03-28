import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Image, Button } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import TextField from '~/shared/components/text-input';

const SignIn = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const onPress = async () => {};

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ alignItems: 'center' }}>
        <Image
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
          source={require('~/assets/images/logo.png')}
        />
      </View>
      <TextField
        onChangeText={(text: string) => console.log('AQUI', text)}
        placeholder="Email"
      />
      <TextField
        onChangeText={(text: string) => console.log('AQUI', text)}
        placeholder="Senha"
      />
      <Button onPress={onPress} title="Login" />
    </SafeAreaView>
  );
};

export default SignIn;
