import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import {
  downvotePlant as downvoteMutation,
  upvotePlant as upvoteMutation,
} from '~/services/api/resources/plant';
import { usePlantStore } from '~/store/plant-store';
import { Plant } from '~/shared/types';
import { updatePlantList } from '~/shared/utils/plant';

export function useVotePlant() {
  const setSelectedPlant = usePlantStore((state) => state.setSelectedPlant);
  const setPlants = usePlantStore((state) => state.setPlants);
  const plants = usePlantStore((state) => state.plants);

  const { mutate: mutateUpvote, data: upvoteResponse } = useMutation({
    mutationFn: upvoteMutation,
  });
  const { mutate: mutateDownvote, data: downvoteResponse } = useMutation({
    mutationFn: downvoteMutation,
  });
  const done = useRef(true);

  const updatePlants = useCallback(
    (plant: Plant) => {
      const updatedPlantList = updatePlantList(plants, plant);

      setSelectedPlant(plant);
      setPlants(updatedPlantList);
    },
    [plants, setPlants, setSelectedPlant]
  );

  useEffect(() => {
    if (!downvoteResponse) {
      return;
    }

    const { response } = downvoteResponse;

    if (!done.current && response.data) {
      done.current = true;

      const { plant } = response.data;

      updatePlants(plant);
    }
  }, [downvoteResponse, setSelectedPlant, updatePlants]);

  useEffect(() => {
    if (!upvoteResponse) {
      return;
    }

    const { response } = upvoteResponse;

    if (!done.current && response.data) {
      done.current = true;

      const { plant } = response.data;

      updatePlants(plant);
    }
  }, [upvoteResponse, setSelectedPlant, updatePlants]);

  const downvote = useCallback(
    async (plantId: string) => {
      mutateDownvote(plantId);
      done.current = false;
    },
    [mutateDownvote]
  );

  const upvote = useCallback(
    async (plantId: string) => {
      mutateUpvote(plantId);
      done.current = false;
    },
    [mutateUpvote]
  );

  return { downvote, upvote };
}
