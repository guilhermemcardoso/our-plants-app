import React from 'react';
import { Image, Pressable } from 'react-native';
import { MarkerView } from '@rnmapbox/maps';
import { styles } from './styles';
import { MarkerProps } from './types';
import { getPlantIconBySpecie } from '~/shared/utils/icon';
import { View } from 'native-base';

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
        <View style={styles.userMarkerContainer}>
          <Image
            resizeMode="contain"
            source={require('~/assets/images/marker.png')}
            style={styles.userIcon}
          />
        </View>
      </MarkerView>
    );
  }

  return (
    <MarkerView
      key={`${plant?._id}-${latitude}-${longitude}`}
      coordinate={[longitude, latitude]}
    >
      <Pressable onPress={handlePress}>
        <Image
          resizeMode="contain"
          fadeDuration={0}
          source={getPlantIconBySpecie(plant?.specie_id._id.toString() || '')}
          style={styles.markerIcon}
        />
      </Pressable>
    </MarkerView>
  );
}
