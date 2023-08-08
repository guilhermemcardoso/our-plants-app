import { Actionsheet, Box, Image, View, useTheme } from 'native-base';
import React, { useMemo } from 'react';
import Text from '../text';
import { Plant } from '~/shared/types';
import styles from './styles';
import Button from '../button';
import IconButton from '../icon-button';
import { Linking, Platform } from 'react-native';
import Votes from '../votes';
import { useVotePlant } from '~/hooks/use-vote-plant';
import { useFavoriteStore } from '~/store/favorite-store';
import { useAddToFavorites } from '~/hooks/use-add-to-favorites';
import { useRemoveFromFavorites } from '~/hooks/use-remove-from-favorites';

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
  const { downvote, upvote } = useVotePlant();
  const favorites = useFavoriteStore((state) => state.favorites);
  const { addToFavorites } = useAddToFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();

  const isFavorite = useMemo(() => {
    const index = favorites.findIndex(
      (item) => plant && item._id === plant?._id
    );

    return index >= 0;
  }, [favorites, plant]);

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

  const saveFavorite = () => {
    if (!plant) {
      return;
    }

    if (isFavorite) {
      removeFromFavorites(plant._id);
      return;
    }

    addToFavorites(plant?._id);
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content backgroundColor={theme.colors.container.light}>
        <Box style={styles.container}>
          <Votes upvote={upvote} downvote={downvote} plant={plant} />
          <Image
            borderColor={theme.colors.font.secondary}
            style={styles.image}
            resizeMode="cover"
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
            <View style={styles.titleContainer}>
              <View flex={1}>
                <Text size="subtitle">{plant?.specie_id.popular_name}</Text>
                <Text style={styles.description}>{plant?.description}</Text>
              </View>
              <IconButton
                iconName={isFavorite ? 'ios-heart-sharp' : 'ios-heart-outline'}
                onPress={saveFavorite}
              />
            </View>

            <View style={styles.locationContainer}>
              <View flex={1}>
                <Text size="helper">{`Lat:    ${plant?.location.coordinates[1].toFixed(
                  5
                )}`}</Text>
                <Text size="helper">{`Long: ${plant?.location.coordinates[0].toFixed(
                  5
                )}`}</Text>
              </View>
              <IconButton
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
