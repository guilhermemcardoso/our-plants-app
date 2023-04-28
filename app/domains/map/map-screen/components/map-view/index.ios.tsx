import React from 'react';
import MapView from 'react-native-maps';
import { styles } from './styles';
import { MapProps } from './types';

export default function MapViewIos({
  children,
  latitude,
  longitude,
  style,
}: MapProps) {
  return (
    <MapView
      style={[styles.mapContainer, style]}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.04,
      }}
    >
      {children}
    </MapView>
  );
}
