import React from 'react';
import MapView from './components/map-view';
import MarkerView from './components/marker-view';
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';
import { Container } from '~/shared/components';
import { View } from 'native-base';
import styles from './styles';

const Map = () => {
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
      </View>
    </Container>
  );
};

export default Map;
