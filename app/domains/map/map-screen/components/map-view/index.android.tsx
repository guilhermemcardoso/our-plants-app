import React from 'react';
import { Camera, MapView, StyleURL } from '@rnmapbox/maps';
import { styles } from './styles';
import { Platform } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';
import { MapProps } from './types';

MapboxGL.setWellKnownTileServer(Platform.OS === 'ios' ? 'mapbox' : 'Mapbox');
MapboxGL.setAccessToken(MAPBOX_API_KEY);

export default function MapViewAndroid({
  children,
  latitude,
  longitude,
  style,
}: MapProps) {
  return (
    <MapView style={[styles.mapContainer, style]} styleURL={StyleURL.Street}>
      <Camera zoomLevel={15} centerCoordinate={[longitude, latitude]} />
      {children}
    </MapView>
  );
}
