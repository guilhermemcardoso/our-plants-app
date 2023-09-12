import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import {
  downvotePlant as downvoteMutation,
  upvotePlant as upvoteMutation,
} from '~/services/api/resources/plant';
import { usePlantStore } from '~/store/plant-store';
import { Plant } from '~/shared/types';
import { updatePlantList } from '~/shared/utils/plant';
import { useAuthStore } from '~/store/auth-store';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { setKey } from '~/services/secure-storage';

export function useVotePlant() {
  const setSelectedPlant = usePlantStore((state) => state.setSelectedPlant);
  const setPlants = usePlantStore((state) => state.setPlants);
  const plants = usePlantStore((state) => state.plants);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const currentUser = useAuthStore((state) => state.currentUser);

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

      if (currentUser) {
        const updatedCurrentUser = {
          ...response.data.plant.created_by,
          mapped_plants: (currentUser.mapped_plants || 0) + 1,
        };
        setCurrentUser(updatedCurrentUser);
        setKey(EncryptedKeys.CURRENT_USER, JSON.stringify(updatedCurrentUser));
      }

      const { plant } = response.data;

      updatePlants(plant);
    }
  }, [
    upvoteResponse,
    setCurrentUser,
    currentUser,
    setSelectedPlant,
    updatePlants,
  ]);

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
