import React, { useLayoutEffect } from 'react';
import MapView from '~/shared/components/map-view';
import MarkerView from '~/shared/components/marker-view';
import {
  formatSpecieIconName,
  getPlantIconBySpecie,
} from '~/shared/utils/icon';
import { Container, Fab } from '~/shared/components';
import { View } from 'native-base';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { useLocation } from '~/hooks/use-location';
import { useGetPlants } from '~/hooks/use-get-plants';
import { usePlantStore } from '~/store/plant-store';

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.MAP>;

const Map = ({ navigation }: Props) => {
  const { getCurrentLocation } = useLocation();
  const { currentLocation } = useLocation();
  const { getPlants } = useGetPlants();
  const plants = usePlantStore((state) => state.plants);

  const onCreatePlantPlress = () => {
    navigation.navigate(Routes.CREATE_EDIT_PLANT, { plant: undefined });
  };

  useLayoutEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  useLayoutEffect(() => {
    if (currentLocation) {
      getPlants({
        locationData: {
          latitude: currentLocation.coordinates[0],
          longitude: currentLocation.coordinates[1],
          distance: 1000000000,
        },
      });
    }
  }, [currentLocation, getPlants]);

  return (
    <Container>
      <View style={styles.mapContainer}>
        <MapView
          // zoom={1}
          style={styles.map}
          latitude={currentLocation?.coordinates[0] || -22}
          longitude={currentLocation?.coordinates[1] || -48}
        >
          {plants.map((plant) => {
            return (
              <MarkerView
                key={plant._id}
                latitude={plant.location.coordinates[1]}
                longitude={plant.location.coordinates[0]}
                id={plant._id}
                icon={getPlantIconBySpecie(formatSpecieIconName('default'))}
                onPress={() => console.log('Clicou aqui')}
              />
            );
          })}
        </MapView>
        <Fab onPress={onCreatePlantPlress} />
      </View>
    </Container>
  );
};

export default Map;
