import React from 'react';
import { View, Image, Platform, Linking } from 'react-native';
import { Button, Container, Text } from '~/shared/components';
import { styles } from './styles';

const AskForLocation = () => {
  const onGivePermissionPress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <Container>
      <View style={styles.mainContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('~/assets/images/logo.png')}
        />
        <Text size="title" style={styles.title}>
          Nossas Plantas
        </Text>
        <Text size="subtitle" style={styles.subtitle}>
          Acesso à localização do dispositivo
        </Text>
        <Text style={styles.description}>
          Para ter acesso à todas as funcionalidades do aplicativo Nossas
          Plantas, é preciso que o mesmo tenha permissão de acesso à localização
          atual do dispositivo. Não se preocupe, o aplicativo tem acesso à sua
          localização apenas durante o seu uso.
        </Text>
        <Button
          style={styles.button}
          title="IR PARA PERMISSÕES"
          onPress={onGivePermissionPress}
        />
      </View>
    </Container>
  );
};

export default AskForLocation;
