import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { getSpecies as getSpeciesMutation } from '~/services/api/resources/specie';
import { useSpecieStore } from '~/store/specie-store';

export function useGetSpecies() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setSpecies = useSpecieStore((state) => state.setSpecies);

  const {
    mutate,
    isLoading,
    data: getSpeciesResponse,
  } = useMutation({
    mutationFn: getSpeciesMutation,
  });
  useEffect(() => {
    if (!getSpeciesResponse) {
      return;
    }

    const { response, status } = getSpeciesResponse;
    setOnResponse({ status, data: response?.data || [] });
    if (response && response.data && response.data.items) {
      const { items: species } = response.data;
      setSpecies(species);
    }
  }, [getSpeciesResponse, setSpecies]);

  const getSpecies = useCallback(
    async (page = 1, items = 200) => {
      mutate({ page, items });
    },
    [mutate]
  );

  return { isLoading, getSpecies, onResponse };
}
