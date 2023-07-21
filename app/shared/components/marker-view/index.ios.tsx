import React from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import { styles } from './styles';
import { MarkerProps } from './types';
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';

export default function MarkerViewIos({ plant, onPress }: MarkerProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(plant);
    }
  };

  return (
    <Marker
      identifier={plant._id}
      key={plant._id}
      onPress={handlePress}
      coordinate={{
        latitude: plant.location.coordinates[1],
        longitude: plant.location.coordinates[0],
      }}
    >
      <Image
        source={getPlantIconBySpecie(formatSpecieIconName('default'))}
        style={styles.markerIcon}
      />
    </Marker>
  );
}
