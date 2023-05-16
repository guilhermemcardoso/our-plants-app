import React from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import { styles } from './styles';
import { MarkerProps } from './types';

export default function MarkerViewIos({
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
    <Marker
      identifier={id}
      key={id}
      onPress={handlePress}
      coordinate={{ latitude, longitude }}
    >
      <Image source={icon} style={styles.markerIcon} />
    </Marker>
  );
}
