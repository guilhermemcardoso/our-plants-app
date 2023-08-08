import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Button,
  Container,
  Header,
  IconButton,
  Slideshow,
  Text,
  Votes,
} from '~/shared/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { usePlantStore } from '~/store/plant-store';
import { Box, ScrollView, View, useTheme } from 'native-base';
import MapView from '~/shared/components/map-view';
import MarkerView from '~/shared/components/marker-view';
import { useVotePlant } from '~/hooks/use-vote-plant';
import { useAuthStore } from '~/store/auth-store';
import { ADMIN_LEVEL } from '~/shared/constants/constants';
import { useAddToFavorites } from '~/hooks/use-add-to-favorites';
import { useFavoriteStore } from '~/store/favorite-store';
import { useRemoveFromFavorites } from '~/hooks/use-remove-from-favorites';
import styles from './styles';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.VISUALIZE_PLANT
>;

const VisualizePlant = ({ navigation }: Props) => {
  const theme = useTheme();
  const selectedPlant = usePlantStore((state) => state.selectedPlant);
  const { currentUser } = useAuthStore();
  const { downvote, upvote } = useVotePlant();
  const favorites = useFavoriteStore((state) => state.favorites);
  const { addToFavorites } = useAddToFavorites();
  const { removeFromFavorites } = useRemoveFromFavorites();

  const isFavorite = useMemo(() => {
    const index = favorites.findIndex(
      (item) => selectedPlant && item._id === selectedPlant?._id
    );
    return index >= 0;
  }, [favorites, selectedPlant]);

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onCreateComplaintPress = () => {
    navigation.navigate(Routes.CREATE_COMPLAINT);
  };

  const canEdit = useMemo(() => {
    return (
      selectedPlant?.created_by._id === currentUser?._id ||
      (currentUser && currentUser?.score.level >= ADMIN_LEVEL)
    );
  }, [currentUser, selectedPlant]);

  const saveFavorite = () => {
    if (!selectedPlant) {
      return;
    }

    if (isFavorite) {
      removeFromFavorites(selectedPlant._id);
      return;
    }

    addToFavorites(selectedPlant?._id);
  };

  const editPlant = () => {
    navigation.navigate(Routes.CREATE_EDIT_PLANT, { plant: selectedPlant });
  };

  return (
    <Container style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Header
            title="Detalhes da Planta"
            LeftComponent={
              <IconButton
                size={26}
                iconName="ios-arrow-back"
                onPress={onBackPress}
              />
            }
            RightComponent={
              canEdit && (
                <IconButton
                  size={26}
                  iconName="ios-pencil-sharp"
                  onPress={editPlant}
                />
              )
            }
          />
        </View>
        <Slideshow images={selectedPlant?.images || []} />
        <View bgColor="container.dark" style={styles.infoContainer}>
          <Box flexDirection="row">
            <Votes
              downvote={downvote}
              upvote={upvote}
              style={styles.voteContainer}
              plant={selectedPlant}
            />
            <Box>
              <View style={styles.specieContainer}>
                <Text size="label" variant="label" style={styles.label}>
                  Espécie:
                </Text>
                <Text size="label" style={styles.specie}>
                  {selectedPlant?.specie_id.popular_name}
                  {selectedPlant?.specie_id.scientific_name ? (
                    <Text size="label" style={styles.italic}>
                      {' '}
                      ({selectedPlant?.specie_id.scientific_name})
                    </Text>
                  ) : (
                    ''
                  )}
                </Text>
              </View>
              <View style={styles.authorContainer}>
                <Text size="label" variant="label" style={styles.label}>
                  Criado por:
                </Text>
                <Text size="label" style={styles.author}>
                  {selectedPlant?.created_by.name}{' '}
                  {selectedPlant?.created_by.lastname}
                </Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text size="label" variant="label" style={styles.label}>
                  Descrição:
                </Text>
                <Text size="label" style={styles.description}>
                  {selectedPlant?.description &&
                  selectedPlant.description.length > 0
                    ? selectedPlant.description
                    : '---'}
                </Text>
              </View>
            </Box>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Text size="label" variant="label" style={styles.label}>
              Localização:
            </Text>
            <IconButton
              iconName={isFavorite ? 'ios-heart-sharp' : 'ios-heart-outline'}
              onPress={saveFavorite}
            />
          </Box>
          <View style={styles.mapContainer}>
            <MapView
              latitude={selectedPlant?.location.coordinates[1] || 0}
              longitude={selectedPlant?.location.coordinates[0] || 0}
            >
              <MarkerView
                plant={selectedPlant}
                latitude={selectedPlant?.location.coordinates[1] || 0}
                longitude={selectedPlant?.location.coordinates[0] || 0}
              />
            </MapView>
          </View>
          <Button
            onPress={onCreateComplaintPress}
            title="DENUNCIAR"
            variant="outline"
            warning
            startIcon={
              <Icon
                name={'ios-alert-circle-outline'}
                size={20}
                color={theme.colors.font.error}
              />
            }
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default VisualizePlant;
