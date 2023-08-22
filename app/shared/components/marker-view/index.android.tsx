import React from 'react';
import { Image, Pressable } from 'react-native';
import { MarkerView, PointAnnotation } from '@rnmapbox/maps';
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
  isUserLocation,
  onPress,
}: MarkerProps) {
  const handlePress = () => {
    if (onPress && plant) {
      onPress(plant);
    }
  };

  if (isUserLocation) {
    return (
      <MarkerView
        key={`${latitude}-${longitude}`}
        coordinate={[longitude, latitude]}
      >
        <Image
          resizeMode="contain"
          source={require('~/assets/images/marker.png')}
          style={styles.userIcon}
        />
      </MarkerView>
    );
  }

  return (
    <Pressable onPress={handlePress}>
      <PointAnnotation
        id={`${latitude}-${longitude}`}
        coordinate={[longitude, latitude]}
        onSelected={handlePress}
      >
        <Image
          source={getPlantIconBySpecie(formatSpecieIconName('default'))}
          style={styles.markerIcon}
        />
      </PointAnnotation>
    </Pressable>
  );
}
