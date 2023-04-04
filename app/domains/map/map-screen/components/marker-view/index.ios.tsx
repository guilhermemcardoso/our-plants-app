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
    onPress(id);
  };

  return (
    <Marker
      identifier={id}
      key={id}
      onPress={handlePress}
      title="title"
      description="description"
      coordinate={{ longitude: latitude, latitude: longitude }}
    >
      <Image source={icon} style={styles.markerIcon} />
    </Marker>
  );
}
