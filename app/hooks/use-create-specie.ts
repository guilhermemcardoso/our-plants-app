import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CreateEditSpecieData } from '~/domains/specie/types';
import { createSpecie as createSpecieMutation } from '~/services/api/resources/specie';
import { useSpecieStore } from '~/store/specie-store';

export function useCreateSpecie() {
  const {
    mutate,
    isLoading,
    data: createSpecieResponse,
  } = useMutation({
    mutationFn: createSpecieMutation,
  });
  const species = useSpecieStore((state) => state.species);
  const setSpecies = useSpecieStore((state) => state.setSpecies);
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const done = useRef(true);

  useEffect(() => {
    if (!createSpecieResponse) {
      return;
    }

    const { response, status } = createSpecieResponse;

    if (!done.current) {
      done.current = true;
      setOnResponse({ status, data: response.data });
      if (status === 201) {
        setSpecies([...species, response.data.specie]);
      }
    }
  }, [createSpecieResponse, setSpecies, species]);

  const createSpecie = useCallback(
    async ({ popular_name, scientific_name }: CreateEditSpecieData) => {
      mutate({ popular_name, scientific_name });
      done.current = false;
    },
    [mutate]
  );

  return { isLoading, createSpecie, onResponse };
}
