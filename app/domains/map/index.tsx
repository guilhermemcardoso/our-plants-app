import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { initializeMap } from '~/shared/utils/map';

const Map = () => {
  const [coordinates] = useState([-47.87857, -21.969408]);

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street}>
        <MapboxGL.Camera zoomLevel={4} centerCoordinate={coordinates} />
      </MapboxGL.MapView>
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
