import React from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import { styles } from './styles';
import { MarkerProps } from './types';
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';

export default function MarkerViewIos({
  plant,
  latitude,
  longitude,
  onPress,
}: MarkerProps) {
  const handlePress = () => {
    if (onPress && plant) {
      onPress(plant);
    }
  };

  return (
    <Marker
      identifier={`${latitude}-${longitude}`}
      key={`${latitude}-${longitude}`}
      onPress={handlePress}
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
    >
      <Image
        source={getPlantIconBySpecie(formatSpecieIconName('default'))}
        style={styles.markerIcon}
      />
    </Marker>
  );
}
