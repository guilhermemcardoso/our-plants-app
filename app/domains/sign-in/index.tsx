import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Button } from 'react-native';
import { Api } from '~/services/api';

import TextField from '~/shared/components/text-input';
import { useAuthStore } from '~/store/auth-store';

const SignIn = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  console.log('currentUser', currentUser);
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);

  const onPress = async () => {
    setCurrentUser('current user test');
    setAccessToken('access token test');
    setRefreshToken('refresh token test');

    await Api({ method: 'get', url: '/ping' });
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
