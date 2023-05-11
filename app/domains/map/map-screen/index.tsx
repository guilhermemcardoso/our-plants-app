import React from 'react';
import MapView from '~/shared/components/map-view';
import MarkerView from '~/shared/components/marker-view';
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';
import { Container, Fab } from '~/shared/components';
import { View } from 'native-base';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.MAP>;

const Map = ({ navigation }: Props) => {
  const onCreatePlantPlress = () => {
    navigation.navigate(Routes.CREATE_EDIT_PLANT, { plant: undefined });
  };

  return (
    <Container>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          latitude={-21.950384}
          longitude={-47.892363}
        >
          <MarkerView
            latitude={-21.950384}
            longitude={-47.892363}
            id="id-1"
            icon={getPlantIconBySpecie(formatSpecieIconName('default'))}
            onPress={() => console.log('Clicou aqui')}
          />
        </MapView>
        <Fab onPress={onCreatePlantPlress} />
      </View>
    </Container>
  );
};

export default Map;
