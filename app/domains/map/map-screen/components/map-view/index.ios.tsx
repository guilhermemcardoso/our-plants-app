import React from 'react';
import MapView from 'react-native-maps';
import { styles } from './styles';
import { MapProps } from './types';

export default function MapViewIos({ children }: MapProps) {
  return (
    <MapView
      style={styles.mapContainer}
      initialRegion={{
        latitude: -21.950384,
        longitude: -47.892363,
        latitudeDelta: 0.08,
        longitudeDelta: 0.04,
      }}
    >
      {children}
    </MapView>
  );
}
