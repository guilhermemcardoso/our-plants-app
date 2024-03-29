import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import {
  createPlant as createPlantMutation,
  editPlant as editPlantMutation,
} from '~/services/api/resources/plant';
import { setKey } from '~/services/secure-storage';
import { usePlantStore } from '~/store/plant-store';
import { CreateEditPlantData } from '~/domains/plant/types';
import { uploadImage } from '~/services/cloud-storage';
import { isValidUrl } from '~/shared/utils/url';
import { useAuthStore } from '~/store/auth-store';
import { EncryptedKeys } from '~/services/secure-storage/constants';

export function useCreateEditPlant() {
  const [isUploading, setIsUploading] = useState(false);
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const currentUser = useAuthStore((state) => state.currentUser);
  const setPlants = usePlantStore((state) => state.setPlants);
  const setSelectedPlant = usePlantStore((state) => state.setSelectedPlant);
  const plants = usePlantStore((state) => state.plants);
  const done = useRef(true);

  const {
    mutate: createMutate,
    isLoading: isCreateLoading,
    data: createPlantResponse,
  } = useMutation({
    mutationFn: createPlantMutation,
  });

  const {
    mutate: editMutate,
    isLoading: isEditLoading,
    data: editPlantResponse,
  } = useMutation({
    mutationFn: editPlantMutation,
  });

  useEffect(() => {
    if (!createPlantResponse) {
      return;
    }

    const { response, status } = createPlantResponse;
    if (!done.current) {
      done.current = true;
      setOnResponse({ status: status || 500, data: response });
      if (response.data && currentUser) {
        const updatedCurrentUser = {
          ...response.data.plant.created_by,
          mapped_plants: (currentUser.mapped_plants || 0) + 1,
        };
        setCurrentUser(updatedCurrentUser);
        setKey(EncryptedKeys.CURRENT_USER, JSON.stringify(updatedCurrentUser));
        setPlants([...plants, response.data.plant]);
      }
    }
  }, [createPlantResponse, currentUser, setCurrentUser, setPlants, plants]);

  useEffect(() => {
    if (!editPlantResponse) {
      return;
    }

    const { response, status } = editPlantResponse;
    if (!done.current && response) {
      done.current = true;
      setOnResponse({ status: status || 500, data: response });
      if (response.data) {
        const { plant } = response.data;
        const updatedPlants = plants.map((item) => {
          if (item._id === plant._id) {
            return plant;
          }

          return item;
        });
        setPlants(updatedPlants);
        setSelectedPlant(plant);
      }
    }
  }, [editPlantResponse, setPlants, setSelectedPlant, plants]);

  const createPlant = async (plantData: CreateEditPlantData) => {
    try {
      setIsUploading(true);
      const imageUrls: string[] = [];
      for await (const imageUri of plantData.images || []) {
        if (isValidUrl(imageUri)) {
          imageUrls.push(imageUri);
        } else {
          const imageUrl = await uploadImage(imageUri);
          imageUrls.push(imageUrl);
        }
      }

      const updatedPlantData = { ...plantData, images: imageUrls };
      setIsUploading(false);
      createMutate(updatedPlantData);
      done.current = false;
    } catch (error) {
      setIsUploading(false);
      console.log('[useCreateEditPlant] - update image error', error);
    }
  };

  const editPlant = async (plantId: string, plantData: CreateEditPlantData) => {
    try {
      setIsUploading(true);
      const imageUrls: string[] = [];
      for await (const imageUri of plantData.images || []) {
        if (isValidUrl(imageUri)) {
          imageUrls.push(imageUri);
        } else {
          const imageUrl = await uploadImage(imageUri);
          imageUrls.push(imageUrl);
        }
      }
      const updatedPlantData = { ...plantData, images: imageUrls };
      setIsUploading(false);
      editMutate({ plantId, editPlantData: updatedPlantData });
      done.current = false;
    } catch (error) {
      setIsUploading(false);
      console.log('[useCreateEditPlant] - update image error', error);
    }
  };

  return {
    isLoading: isCreateLoading || isEditLoading || isUploading,
    createPlant,
    editPlant,
    onResponse,
  };
}
