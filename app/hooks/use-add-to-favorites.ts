import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { addToFavorites as addToFavoritesMutation } from '~/services/api/resources/favorite';
import { Plant } from '~/shared/types';
import { useFavoriteStore } from '~/store/favorite-store';

export function useAddToFavorites() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setFavorites = useFavoriteStore((state) => state.setFavorites);

  const {
    mutate,
    isLoading,
    data: addToFavoritesResponse,
  } = useMutation({
    mutationFn: addToFavoritesMutation,
  });
  useEffect(() => {
    if (!addToFavoritesResponse) {
      return;
    }

    const { response, status } = addToFavoritesResponse;
    setOnResponse({ status, data: response.data });
    if (
      response.data &&
      response.data.favorites &&
      response.data.favorites.plants
    ) {
      const {
        favorites: { plants },
      } = response.data;

      setFavorites(plants as Plant[]);
    }
  }, [addToFavoritesResponse, setFavorites]);

  const addToFavorites = useCallback(
    async (plantId: string) => {
      mutate(plantId);
    },
    [mutate]
  );

  return { isLoading, addToFavorites, onResponse };
}
