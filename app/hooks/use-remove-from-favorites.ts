import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { removeFromFavorites as removeFromFavoritesMutation } from '~/services/api/resources/favorite';
import { Plant } from '~/shared/types';
import { useFavoriteStore } from '~/store/favorite-store';

export function useRemoveFromFavorites() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setFavorites = useFavoriteStore((state) => state.setFavorites);

  const {
    mutate,
    isLoading,
    data: removeFromFavoritesResponse,
  } = useMutation({
    mutationFn: removeFromFavoritesMutation,
  });
  useEffect(() => {
    if (!removeFromFavoritesResponse) {
      return;
    }

    const { response, status } = removeFromFavoritesResponse;
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
  }, [removeFromFavoritesResponse, setFavorites]);

  const removeFromFavorites = useCallback(
    async (plantId: string) => {
      mutate(plantId);
    },
    [mutate]
  );

  return { isLoading, removeFromFavorites, onResponse };
}
