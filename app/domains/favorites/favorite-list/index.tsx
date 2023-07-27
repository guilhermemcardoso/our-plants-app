import React, { useEffect, useMemo } from 'react';
import { Container, Header, IconButton } from '~/shared/components';
import styles from './styles';
import { FlatList, View } from 'native-base';
import { ListRenderItem } from 'react-native';
import { Plant } from '~/shared/types';
import { EmptyList, FavoriteItem } from '../components';
import { useFavoritesStore } from '~/store/favorites-store';
import { useGetFavorites } from '~/hooks/use-get-favorites';
import { useLoading } from '~/hooks/use-loading';
import { calcDistance } from '~/shared/utils/distance';
import { useRemoveFromFavorites } from '~/hooks/use-remove-from-favorites';
import { useLocation } from '~/hooks/use-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedInStackParamList } from '~/navigation/stacks/signed-in';
import { Routes } from '~/navigation/routes';
import { usePlantStore } from '~/store/plant-store';

type Props = NativeStackScreenProps<SignedInStackParamList, Routes.FAVORITES>;

const Favorites = ({ navigation }: Props) => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const { setLoading } = useLoading();
  const { currentLocation } = useLocation();
  const setSelectedPlant = usePlantStore((state) => state.setSelectedPlant);
  const { isLoading: isGetFavoritesLoading, getFavorites } = useGetFavorites();
  const { isLoading: isRemoveFromFavoritesLoading, removeFromFavorites } =
    useRemoveFromFavorites();

  const isLoading = useMemo(() => {
    return isGetFavoritesLoading || isRemoveFromFavoritesLoading;
  }, [isGetFavoritesLoading, isRemoveFromFavoritesLoading]);

  const onGetFavoritesPress = () => {
    getFavorites();
  };

  const onPressItem = (item: Plant) => {
    setSelectedPlant(item);
    console.log('ITEM', item.created_by.name);
    navigation.navigate(Routes.VISUALIZE_PLANT);
  };

  const onFavoriteItem = (item: Plant) => {
    removeFromFavorites(item._id);
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const onRenderItem: ListRenderItem<Plant> = ({ item }: { item: Plant }) => {
    const distance = currentLocation
      ? calcDistance(currentLocation, item.location)
      : null;

    return (
      <FavoriteItem
        onPress={onPressItem}
        data={item}
        onFavorite={onFavoriteItem}
        distance={distance}
      />
    );
  };

  return (
    <Container>
      <Header
        title="Favoritos"
        RightComponent={
          <IconButton
            size={26}
            iconName="ios-refresh"
            onPress={onGetFavoritesPress}
          />
        }
      />
      <View style={styles.mainContainer}>
        <FlatList
          renderItem={onRenderItem}
          data={favorites}
          ListEmptyComponent={<EmptyList />}
        />
      </View>
    </Container>
  );
};

export default Favorites;
