import React from 'react';
import { Camera, MapView, StyleURL } from '@rnmapbox/maps';
import { styles } from './styles';
import { Platform } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';
import { MapProps } from './types';
import { Location } from '~/shared/types';
import { RegionPayload } from '@rnmapbox/maps/lib/typescript/components/MapView';

MapboxGL.setWellKnownTileServer(Platform.OS === 'ios' ? 'mapbox' : 'Mapbox');
MapboxGL.setAccessToken(MAPBOX_API_KEY);

export default function MapViewAndroid({
  children,
  latitude,
  longitude,
  onPress,
  onRegionChange,
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

  const onRegionDidChange = (
    feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>
  ) => {
    const { geometry } = feature;
    const long = geometry.coordinates[0];
    const lat = geometry.coordinates[1];
    onRegionChange(lat, long);
  };

  return (
    <MapView
      logoEnabled={false}
      onPress={handleOnPress}
      style={[styles.mapContainer, style]}
      styleURL={StyleURL.Street}
      // TODO: update to onMapIdle when onRegionDidChange is deprecated
      // onMapIdle={(state) => console.log('MAP IDLE', state)}
      onRegionDidChange={onRegionDidChange}
    >
      <Camera
        zoomLevel={zoom}
        animationDuration={150}
        centerCoordinate={[longitude, latitude]}
      />
      {children}
    </MapView>
  );
}
