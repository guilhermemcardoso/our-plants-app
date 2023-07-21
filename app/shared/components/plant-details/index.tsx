import { Actionsheet, Box, Image, View, useTheme } from 'native-base';
import React from 'react';
import Text from '../text';
import { Plant } from '~/shared/types';
import styles from './styles';
import Button from '../button';
import IconButton from '../icon-button';
import { Linking, Platform } from 'react-native';

interface Props {
  plant: Plant | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSeeMorePress: () => void;
}

export default function PlantDetails({
  isOpen,
  plant,
  onClose,
  onSeeMorePress,
}: Props) {
  const theme = useTheme();

  const openRoutes = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${plant?.location.coordinates[1]},${plant?.location.coordinates[0]}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content backgroundColor={theme.colors.container.light}>
        <Box style={styles.container}>
          <Image
            borderColor={theme.colors.font.secondary}
            style={styles.image}
            resizeMode="contain"
            source={
              plant?.images[0]
                ? {
                    uri: plant?.images[0],
                  }
                : require('~/assets/images/default_plant.png')
            }
            alt={
              plant?.specie_id.popular_name ||
              plant?.description ||
              'Ícone padrão'
            }
          />
          <View style={styles.infoContainer}>
            <Text size="subtitle">{plant?.specie_id.popular_name}</Text>
            <Text style={styles.description}>{plant?.description}</Text>
            <View style={styles.locationContainer}>
              <View flex={1}>
                <Text size="helper">{`Latitude: ${plant?.location.coordinates[1].toFixed(
                  5
                )}`}</Text>
                <Text size="helper">{`Longitude: ${plant?.location.coordinates[0].toFixed(
                  5
                )}`}</Text>
              </View>
              <IconButton
                backgroundColor={theme.colors.primary.pure}
                style={styles.goButton}
                iconName="ios-arrow-redo-sharp"
                onPress={openRoutes}
              />
            </View>
          </View>
        </Box>
        <Button
          style={styles.button}
          mx={3}
          title="VER MAIS"
          onPress={onSeeMorePress}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
}
