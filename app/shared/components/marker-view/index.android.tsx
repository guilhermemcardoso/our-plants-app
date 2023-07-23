import React from 'react';
import { MarkerView } from '@rnmapbox/maps';
import { Image, Pressable } from 'react-native';
import { styles } from './styles';
import { MarkerProps } from './types';
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';

export default function MarkerViewAndroid({
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
    <MarkerView
      key={`${latitude}-${longitude}`}
      coordinate={[longitude, latitude]}
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
