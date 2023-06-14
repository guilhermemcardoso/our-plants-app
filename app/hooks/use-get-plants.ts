import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getPlantsNearBy as getPlantsNearByMutation } from '~/services/api/resources/plant';
import { usePlantStore } from '~/store/plant-store';

export function useGetPlants() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setPlants = usePlantStore((state) => state.setPlants);

  const {
    mutate,
    isLoading,
    data: getPlantsResponse,
  } = useMutation({
    mutationFn: getPlantsNearByMutation,
  });
  const done = useRef(true);

  useEffect(() => {
    if (!getPlantsResponse) {
      return;
    }

    const { response, status } = getPlantsResponse;
    setOnResponse({ status, data: response?.data || [] });
    if (!done.current && response?.data) {
      if (response && response.data && response.data.items) {
        const { items: plants } = response.data;

        setPlants(plants);
      }
    }
  }, [getPlantsResponse, setPlants]);

  const getPlantsNearBy = useCallback(
    async ({
      locationData,
      filteredSpecies,
    }: {
      filteredSpecies: string[];
      locationData: {
        latitude: number;
        longitude: number;
        distance: number;
      };
    }) => {
      mutate({ locationData, filteredSpecies });
      done.current = false;
    },
    [mutate]
  );

  return { isLoading, getPlantsNearBy, onResponse };
}
