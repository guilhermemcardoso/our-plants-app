import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Image, Button } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import auth from '@react-native-firebase/auth';
import TextField from '~/presentation/components/TextField';
import { TextFieldType } from '~/presentation/components/TextField/types';

const SignIn = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const onPress = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        'john.doe@example.com',
        'SuperSecretPassword!'
      );
      console.log('RESPONSE', response);
      const token = await auth().currentUser?.getIdToken(true);
      console.log('token', token);
    } catch (error) {
      console.error(error);
    }
  };

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
        fieldType={TextFieldType.Email}
        onChange={(text: string) => console.log('AQUI', text)}
        required
        showErrors
        placeholder="Email"
      />
      <TextField
        fieldType={TextFieldType.Password}
        onChange={(text: string) => console.log('AQUI', text)}
        required
        showErrors
        placeholder="Senha"
      />
      <Button onPress={onPress} title="Login" />
    </SafeAreaView>
  );
};

export default SignIn;
