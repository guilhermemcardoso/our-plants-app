import React from 'react';
import MapView, { MapPressEvent, Region } from 'react-native-maps';
import { styles } from './styles';
import { MapProps } from './types';
import { Location } from '~/shared/types';

export default function MapViewIos({
  children,
  latitude,
  longitude,
  longitudeDelta = 0.006,
  latitudeDelta = 0.006,
  onPress,
  onRegionChange,
  style,
}: MapProps) {
  const handleOnPress = (event: MapPressEvent) => {
    if (event.nativeEvent.coordinate && onPress) {
      onPress({
        location: {
          coordinates: [
            event.nativeEvent.coordinate.latitude,
            event.nativeEvent.coordinate.longitude,
          ],
          type: 'Point',
        } as Location,
      });
    }
  };

  const onRegionChangeComplete = (region: Region) => {
    const lat = region.latitude;
    const long = region.longitude;
    if (onRegionChange) {
      onRegionChange({ latitude: lat, longitude: long });
    }
  };

  return (
    <MapView
      onPress={handleOnPress}
      zoomEnabled
      onRegionChangeComplete={onRegionChangeComplete}
      style={[styles.mapContainer, style]}
      region={{
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
