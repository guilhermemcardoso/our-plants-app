import React, { useCallback } from 'react';
import { Container, Header, IconButton } from '~/shared/components';
import { View } from 'native-base';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.VISUALIZE_PLANT
>;

const VisualizePlant = ({ navigation }: Props) => {
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header
        title="Detalhes da Planta"
        LeftComponent={
          <IconButton
            size={26}
            iconName="ios-arrow-back"
            onPress={handleBackPress}
          />
        }
        RightComponent={
          <IconButton size={26} iconName="ios-refresh" onPress={() => {}} />
        }
      />
      <View style={styles.mapContainer}></View>
    </Container>
  );
};

export default VisualizePlant;
