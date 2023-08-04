import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { FilterOption, Plant } from '~/shared/types';
import { useGetFavorites } from '~/hooks/use-get-favorites';
import { useGetComplaints } from '~/hooks/use-get-complaints';
import { useGetMyComplaints } from '~/hooks/use-get-my-complaints';

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.MAP>;

const Map = ({ navigation }: Props) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);
  const selectedPlant = usePlantStore((state) => state.selectedPlant);
  const setSelectedPlant = usePlantStore((state) => state.setSelectedPlant);
  const [filteredSpecies, setFilteredSpecies] = useState<FilterOption[]>([]);
  const { distance } = useSettings();
  const { getCurrentLocation } = useLocation();
  const { currentLocation } = useLocation();
  const { getFavorites } = useGetFavorites();
  const { getComplaints } = useGetComplaints();
  const { getMyComplaints } = useGetMyComplaints();
  const { getPlantsNearBy } = useGetPlants();
  const plants = usePlantStore((state) => state.plants);
  const species = useSpecieStore((state) => state.species);

  const filterOptions = useMemo(() => {
    return species.map((specie) => {
      return { key: specie._id, value: specie.popular_name };
    });
  }, [species]);

  const firstLoad = useRef(true);

  const onCreatePlantPress = () => {
    navigation.navigate(Routes.CREATE_EDIT_PLANT, { plant: undefined });
  };

  const onOpenFilter = () => {
    setFilterIsOpen(true);
  };

  const onCloseFilter = () => {
    setFilterIsOpen(false);
  };

  const onFilter = (options: FilterOption[]) => {
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
      navigation.navigate(Routes.VISUALIZE_PLANT);
      setDetailsIsOpen(false);
    }
  };

  useLayoutEffect(() => {
    if (firstLoad.current) {
      getCurrentLocation();
      getFavorites();
      getComplaints(false);
      getMyComplaints(false);
      firstLoad.current = false;
    }
  }, [getCurrentLocation, getFavorites, getComplaints, getMyComplaints]);

  useLayoutEffect(() => {
    if (currentLocation) {
      getPlantsNearBy({
        locationData: {
          latitude: currentLocation.coordinates[0],
          longitude: currentLocation.coordinates[1],
          distance: distance,
        },
        filteredSpecies: filteredSpecies.map((specie) => specie.key),
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
                latitude={Number(plant.location.coordinates[1])}
                longitude={Number(plant.location.coordinates[0])}
                plant={plant}
                onPress={showPlantDetails}
              />
            );
          })}
        </MapView>
        <Fab onPress={onCreatePlantPress} />
        <Filter
          selectedValues={filteredSpecies}
          onFilter={onFilter}
          show={filterIsOpen}
          options={filterOptions}
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
