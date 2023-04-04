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
    onPress(id);
  };

  return (
    <MarkerView key={id} coordinate={[latitude, longitude]} allowOverlap>
      <Pressable onPress={handlePress}>
        <Image source={icon} style={styles.markerIcon} />
      </Pressable>
    </MarkerView>
  );
}
