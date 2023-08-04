import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getFavorites as getFavoritesMutation } from '~/services/api/resources/favorite';
import { Plant } from '~/shared/types';
import { useFavoritesStore } from '~/store/favorites-store';

export function useGetFavorites() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setFavorites = useFavoritesStore((state) => state.setFavorites);

  const {
    mutate,
    isLoading,
    data: getFavoritesResponse,
  } = useMutation({
    mutationFn: getFavoritesMutation,
  });
  const done = useRef(true);

  useEffect(() => {
    if (!getFavoritesResponse) {
      return;
    }

    const { response, status } = getFavoritesResponse;
    setOnResponse({ status, data: response?.data || [] });

    if (!done.current && response.data) {
      done.current = true;

      const {
        favorites: { plants },
      } = response.data;

      setFavorites((plants || []) as Plant[]);
    }
  }, [getFavoritesResponse, setFavorites]);

  const getFavorites = useCallback(async () => {
    mutate();
    done.current = false;
  }, [mutate]);

  return { isLoading, getFavorites, onResponse };
}
