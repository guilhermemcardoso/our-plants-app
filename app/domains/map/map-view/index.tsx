import React, { useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';

MapboxGL.setWellKnownTileServer(Platform.OS === 'ios' ? 'mapbox' : 'Mapbox');
MapboxGL.setAccessToken(MAPBOX_API_KEY);

const Map = () => {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street}>
        {/* <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={[-47.892363, -21.950384]}
        /> */}
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={[-47.892363, -21.950384]}
        />
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
