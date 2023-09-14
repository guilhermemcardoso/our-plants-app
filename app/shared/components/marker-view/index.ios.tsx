import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { styles } from './styles';
import { MarkerProps } from './types';
import { getPlantIconBySpecie } from '~/shared/utils/icon';

export default function MarkerViewIos({
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

  return (
    <Marker
      zIndex={isUserLocation ? 1 : 0}
      identifier={`${latitude}-${longitude}`}
      key={`${latitude}-${longitude}`}
      onPress={handlePress}
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
    >
      {isUserLocation ? (
        <Image
          resizeMode="contain"
          source={require('~/assets/images/marker.png')}
          style={styles.userIcon}
        />
      ) : (
        <Image
          resizeMode="contain"
          fadeDuration={0}
          source={getPlantIconBySpecie(plant?.specie_id._id.toString() || '')}
          style={styles.markerIcon}
        />
      )}
    </Marker>
  );
}
