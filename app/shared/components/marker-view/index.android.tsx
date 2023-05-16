import React from 'react';
import { MarkerView } from '@rnmapbox/maps';
import { Image, Pressable } from 'react-native';
import { styles } from './styles';
import { MarkerProps } from './types';

export default function MarkerViewAndroid({
  icon,
  id,
  latitude,
  longitude,
  onPress,
}: MarkerProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(id);
    }
  };

  return (
    <MarkerView key={id} coordinate={[longitude, latitude]} allowOverlap>
      <Pressable onPress={handlePress}>
        <Image source={icon} style={styles.markerIcon} />
      </Pressable>
    </MarkerView>
  );
}
