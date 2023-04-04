import React from 'react';
import { Camera, MapView, StyleURL } from '@rnmapbox/maps';
import { styles } from './styles';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';
import { Platform } from 'react-native';
import { MapProps } from './types';

MapboxGL.setWellKnownTileServer(Platform.OS === 'ios' ? 'mapbox' : 'Mapbox');
MapboxGL.setAccessToken(MAPBOX_API_KEY);

export default function MapViewAndroid({
  children,
  latitude,
  longitude,
}: MapProps) {
  return (
    <MapView style={styles.mapContainer} styleURL={StyleURL.Street}>
      <Camera zoomLevel={15} centerCoordinate={[longitude, latitude]} />
      {children}
    </MapView>
  );
}
