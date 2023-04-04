import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Button } from 'react-native';
import TextField from '~/shared/components/text-input';
import { useAuthStore } from '~/store/auth-store';
import { styles } from './styles';
import { Text } from 'native-base';

const SignIn = () => {
  const signIn = useAuthStore((state) => state.signIn);

  const onPress = async () => {
    await signIn('xgogyzmqrwdnbkhodq@bbitq.com', 'Senha123');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#e2e2e2'} barStyle={'dark-content'} />
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('~/assets/images/logo.png')}
        />
        <Text style={styles.title}>Nossas Plantas</Text>
      </View>
      <TextField
        onChangeText={(text: string) => console.log('AQUI', text)}
        placeholder="Email"
        error="teste aqui"
      />
      <TextField
        onChangeText={(text: string) => console.log('AQUI', text)}
        placeholder="Senha"
        error="teste denovo"
      />
      <Button onPress={onPress} title="Login" />
    </SafeAreaView>
  );
};

export default SignIn;
