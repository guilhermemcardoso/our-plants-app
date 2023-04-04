import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from './components/map-view';
import MarkerView from './components/marker-view';
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView>
        <MarkerView
          latitude={-47.892363}
          longitude={-21.950384}
          id="id-1"
          icon={getPlantIconBySpecie(formatSpecieIconName('default'))}
          onPress={() => console.log('Clicou aqui')}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'tomato',
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
