import React from 'react';
import MapView, { MapPressEvent } from 'react-native-maps';
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
  style,
}: MapProps) {
  const handleOnPress = (event: MapPressEvent) => {
    if (event.nativeEvent.coordinate && onPress) {
      onPress({
        coordinates: [
          event.nativeEvent.coordinate.latitude,
          event.nativeEvent.coordinate.longitude,
        ],
        type: 'Point',
      } as Location);
    }
  };

  return (
    <MapView
      onPress={handleOnPress}
      zoomEnabled
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
