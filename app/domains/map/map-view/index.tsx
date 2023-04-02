import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { initializeMap } from '~/services/map';

const Map = () => {
  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street}>
        <MapboxGL.Camera followZoomLevel={12} followUserLocation />
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
