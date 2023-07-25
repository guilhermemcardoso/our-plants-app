import React, { useCallback, useMemo } from 'react';
import {
  Container,
  Header,
  IconButton,
  Slideshow,
  Text,
  Votes,
} from '~/shared/components';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { usePlantStore } from '~/store/plant-store';
import { Box, ScrollView, View } from 'native-base';
import MapView from '~/shared/components/map-view';
import MarkerView from '~/shared/components/marker-view';
import { useVotePlant } from '~/hooks/use-vote-plant';
import { useAuthStore } from '~/store/auth-store';
import { ADMIN_LEVEL } from '~/shared/constants/constants';

type Props = NativeStackScreenProps<
  SignedInStackParamList,
  Routes.VISUALIZE_PLANT
>;

const VisualizePlant = ({ navigation }: Props) => {
  const selectedPlant = usePlantStore((state) => state.selectedPlant);
  const { currentUser } = useAuthStore();
  const { downvote, upvote } = useVotePlant();
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const canEdit = useMemo(() => {
    return (
      selectedPlant?.created_by._id === currentUser?._id ||
      (currentUser && currentUser?.score.level >= ADMIN_LEVEL)
    );
  }, [currentUser, selectedPlant]);

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
                onPress={handleBackPress}
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
          <Text size="label" variant="label" style={styles.label}>
            Localização:
          </Text>
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
        </View>
      </ScrollView>
    </Container>
  );
};

export default VisualizePlant;
