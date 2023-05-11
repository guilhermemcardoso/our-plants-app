import React from 'react';
import MapView from 'react-native-maps';
import { styles } from './styles';
import { MapProps } from './types';

export default function MapViewIos({
  children,
  latitude,
  longitude,
  longitudeDelta = 0.04,
  latitudeDelta = 0.08,
  style,
}: MapProps) {
  return (
    <MapView
      zoomEnabled
      style={[styles.mapContainer, style]}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      }}
    >
      {children}
    </MapView>
  );
}
