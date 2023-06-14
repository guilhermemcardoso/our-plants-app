import React from 'react';
import { Camera, MapView, StyleURL } from '@rnmapbox/maps';
import { styles } from './styles';
import { Platform } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';
import { MapProps } from './types';
import { Location } from '~/shared/types';

MapboxGL.setWellKnownTileServer(Platform.OS === 'ios' ? 'mapbox' : 'Mapbox');
MapboxGL.setAccessToken(MAPBOX_API_KEY);

export default function MapViewAndroid({
  children,
  latitude,
  longitude,
  onPress,
  zoom = 14,
  style,
}: MapProps) {
  const handleOnPress = (feature: any) => {
    if (feature.geometry.coordinates && feature.geometry.type && onPress) {
      const location: Location = {
        coordinates: [
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ],
        type: 'Point',
      };
      onPress(location);
    }
  };

  return (
    <MapView
      onPress={handleOnPress}
      style={[styles.mapContainer, style]}
      styleURL={StyleURL.Street}
    >
      <Camera zoomLevel={zoom} centerCoordinate={[longitude, latitude]} />
      {children}
    </MapView>
  );
}
