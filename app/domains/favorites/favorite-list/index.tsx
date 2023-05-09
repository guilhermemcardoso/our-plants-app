import React, { useEffect, useMemo } from 'react';
import { Container, Header, IconButton } from '~/shared/components';
import styles from './styles';
import { FlatList, View } from 'native-base';
import { ListRenderItem } from 'react-native';
import { Location, Plant } from '~/shared/types';
import { EmptyList, FavoriteItem } from '../components';
import { useFavoritesStore } from '~/store/favorites-store';
import { useGetFavorites } from '~/hooks/use-get-favorites';
import { useLoading } from '~/hooks/use-loading';
import { calcDistance } from '~/shared/utils/distance';
import { useRemoveFromFavorites } from '~/hooks/use-remove-from-favorites';

const Favorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const { setLoading } = useLoading();
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
    console.log('onPressItem', item);
  };

  const onFavoriteItem = (item: Plant) => {
    removeFromFavorites(item._id);
  };

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const onRenderItem: ListRenderItem<Plant> = ({ item }: { item: Plant }) => {
    const userLocation: Location = {
      coordinates: [-21.954603, -47.884553],
      type: 'Point',
    };

    const distance = calcDistance(userLocation, item.location);

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
