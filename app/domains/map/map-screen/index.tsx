import React, { useLayoutEffect, useState } from 'react';
import MapView from '~/shared/components/map-view';
import MarkerView from '~/shared/components/marker-view';
import { Container, Fab, Filter, PlantDetails } from '~/shared/components';
import { View } from 'native-base';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { useLocation } from '~/hooks/use-location';
import { useGetPlants } from '~/hooks/use-get-plants';
import { usePlantStore } from '~/store/plant-store';
import { useSettings } from '~/hooks/use-settings';
import { useSpecieStore } from '~/store/specie-store';
import { Plant, Specie } from '~/shared/types';

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.MAP>;

const Map = ({ navigation }: Props) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant>();
  const [filteredSpecies, setFilteredSpecies] = useState<Specie[]>([]);
  const { distance } = useSettings();
  const { getCurrentLocation } = useLocation();
  const { currentLocation } = useLocation();
  const { getPlantsNearBy } = useGetPlants();
  const plants = usePlantStore((state) => state.plants);
  const species = useSpecieStore((state) => state.species);

  const onCreatePlantPlress = () => {
    navigation.navigate(Routes.CREATE_EDIT_PLANT, { plant: undefined });
  };

  const onOpenFilter = () => {
    setFilterIsOpen(true);
  };

  const onCloseFilter = () => {
    setFilterIsOpen(false);
  };

  const onFilter = (options: Specie[]) => {
    setFilterIsOpen(false);
    setFilteredSpecies(options);
  };

  const showPlantDetails = (plant: Plant) => {
    setSelectedPlant(plant);
    setDetailsIsOpen(true);
  };

  const closePlantDetails = () => {
    setDetailsIsOpen(false);
  };

  const visualizePlant = () => {
    if (selectedPlant) {
      navigation.navigate(Routes.VISUALIZE_PLANT, { plant: selectedPlant });
      setDetailsIsOpen(false);
    }
  };

  useLayoutEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  useLayoutEffect(() => {
    if (currentLocation) {
      getPlantsNearBy({
        locationData: {
          latitude: currentLocation.coordinates[0],
          longitude: currentLocation.coordinates[1],
          distance: distance,
        },
        filteredSpecies: filteredSpecies.map((specie) => specie._id),
      });
    }
  }, [currentLocation, distance, filteredSpecies, getPlantsNearBy]);

  return (
    <Container>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          latitude={currentLocation?.coordinates[0] || -22}
          longitude={currentLocation?.coordinates[1] || -48}
        >
          {plants.map((plant) => {
            return (
              <MarkerView
                key={plant._id}
                plant={plant}
                onPress={showPlantDetails}
              />
            );
          })}
        </MapView>
        <Fab onPress={onCreatePlantPlress} />
        <Filter
          selectedValues={filteredSpecies}
          onFilter={onFilter}
          show={filterIsOpen}
          options={species}
          onOpen={onOpenFilter}
          onClose={onCloseFilter}
        />
        <PlantDetails
          plant={selectedPlant}
          isOpen={detailsIsOpen}
          onClose={closePlantDetails}
          onSeeMorePress={visualizePlant}
        />
      </View>
    </Container>
  );
};

export default Map;
