import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView from '~/shared/components/map-view';
import MarkerView from '~/shared/components/marker-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Button,
  Container,
  Fab,
  Filter,
  IconButton,
  PlantDetails,
} from '~/shared/components';
import { View, useTheme } from 'native-base';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { useLocation } from '~/hooks/use-location';
import { useGetPlants } from '~/hooks/use-get-plants';
import { usePlantStore } from '~/store/plant-store';
import { useSettings } from '~/hooks/use-settings';
import { useSpecieStore } from '~/store/specie-store';
import { FilterOption, Location, Plant } from '~/shared/types';
import { useGetFavorites } from '~/hooks/use-get-favorites';
import { useGetComplaints } from '~/hooks/use-get-complaints';
import { useGetMyComplaints } from '~/hooks/use-get-my-complaints';
import { useDebouncedCallback } from 'use-debounce';

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.MAP>;

const Map = ({ navigation }: Props) => {
  const theme = useTheme();
  const [mapLocation, setMapLocation] = useState<Location>({
    coordinates: [-22, -48],
    type: 'Point',
  });
  const [zoom, setZoom] = useState(14);
  const [mapCoords, setMapCoords] = useState<{
    location: Location;
    zoom: number;
  }>({
    location: {
      coordinates: [-22, -48],
      type: 'Point',
    },
    zoom: 14,
  });
  const [showReloadButton, setShowReloadButton] = useState(false);
  const [canRecenter, setCanRecenter] = useState(false);
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
  const { getPlantsNearBy, isLoading } = useGetPlants();
  const plants = usePlantStore((state) => state.plants);
  const species = useSpecieStore((state) => state.species);

  const filterOptions = useMemo(() => {
    return species.map((specie) => {
      return { key: specie._id, value: specie.popular_name };
    });
  }, [species]);

  const firstLoad = useRef(true);

  const loadPlants = useDebouncedCallback(
    ({
      latitude,
      longitude,
      maxDistance,
      filter,
    }: {
      latitude: number;
      longitude: number;
      maxDistance: number;
      filter: string[];
    }) =>
      getPlantsNearBy({
        locationData: {
          latitude: latitude,
          longitude: longitude,
          distance: maxDistance,
        },
        filteredSpecies: filter,
      }),
    1000
  );

  const onRecenterMap = async () => {
    await getCurrentLocation();
  };

  const onReloadMap = () => {
    setMapCoords({ location: mapLocation, zoom: zoom });
    setShowReloadButton(false);
  };

  const onRegionChange = ({
    latitude,
    longitude,
    zoomLevel = 14,
  }: {
    latitude: number;
    longitude: number;
    zoomLevel?: number;
  }) => {
    setShowReloadButton(true);
    setCanRecenter(true);
    setZoom(zoomLevel);
    setMapLocation({ coordinates: [latitude, longitude], type: 'Point' });
  };

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

  const renderPlants = () => {
    return plants.map((plant) => {
      return (
        <MarkerView
          key={plant._id}
          latitude={Number(plant.location.coordinates[1])}
          longitude={Number(plant.location.coordinates[0])}
          plant={plant}
          onPress={showPlantDetails}
        />
      );
    });
  };

  useEffect(() => {
    if (firstLoad.current) {
      getCurrentLocation();
      getFavorites();
      getComplaints(false);
      getMyComplaints(false);
      firstLoad.current = false;
    }
  }, [getCurrentLocation, getFavorites, getComplaints, getMyComplaints]);

  useEffect(() => {
    if (currentLocation) {
      setMapCoords({ location: currentLocation, zoom: 14 });
      setMapLocation(currentLocation);
      setCanRecenter(false);
    }
  }, [currentLocation]);

  useEffect(() => {
    loadPlants({
      latitude: mapCoords.location.coordinates[0],
      longitude: mapCoords.location.coordinates[1],
      maxDistance: distance,
      filter: filteredSpecies.map((specie) => specie.key),
    });
  }, [mapCoords, distance, filteredSpecies, loadPlants]);

  return (
    <Container>
      <View style={styles.mapContainer}>
        <MapView
          zoom={mapCoords.zoom}
          style={styles.map}
          latitude={mapCoords.location.coordinates[0]}
          longitude={mapCoords.location.coordinates[1]}
          onRegionChange={onRegionChange}
        >
          {renderPlants()}
          <MarkerView
            key={'user-location'}
            latitude={currentLocation?.coordinates[0] || -22}
            longitude={currentLocation?.coordinates[1] || -48}
            isUserLocation
          />
        </MapView>
        <Fab onPress={onCreatePlantPress} />
        {canRecenter && (
          <IconButton
            onPress={onRecenterMap}
            style={styles.recenterBtn}
            iconName="ios-navigate"
            iconColor={theme.colors.loading.background}
            backgroundColor={theme.colors.loading.text}
          />
        )}
        {showReloadButton && (
          <Button
            startIcon={
              <Icon
                name={'ios-download-outline'}
                size={18}
                color={theme.colors.button.text.primary}
              />
            }
            onPress={onReloadMap}
            style={styles.reloadBtn}
            title="Recarregar plantas"
          />
        )}
        <Filter
          selectedValues={filteredSpecies}
          onFilter={onFilter}
          show={filterIsOpen}
          options={filterOptions}
          onOpen={onOpenFilter}
          onClose={onCloseFilter}
          isLoading={isLoading}
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
