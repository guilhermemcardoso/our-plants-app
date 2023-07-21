import React from 'react';
import { MarkerView } from '@rnmapbox/maps';
import { Image, Pressable } from 'react-native';
import { styles } from './styles';
import { MarkerProps } from './types';
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';

export default function MarkerViewAndroid({ plant, onPress }: MarkerProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(plant);
    }
  };

  return (
    <MarkerView
      key={plant._id}
      coordinate={[
        plant.location.coordinates[0],
        plant.location.coordinates[1],
      ]}
      allowOverlap
    >
      <Pressable onPress={handlePress}>
        <Image
          source={getPlantIconBySpecie(formatSpecieIconName('default'))}
          style={styles.markerIcon}
        />
      </Pressable>
    </MarkerView>
  );
}
