import { CreateEditPlantData } from '~/domains/plant/types';
import { Api } from '~/services/api';

export async function getPlantsNearBy({
  locationData,
  filteredSpecies,
}: {
  locationData: {
    latitude: number;
    longitude: number;
    distance: number;
  };
  filteredSpecies: string[];
}) {
  return await Api({
    method: 'post',
    url: 'plant/near-by',
    data: { ...locationData, filteredSpecies },
    hasToken: true,
  });
}

export async function createPlant(createPlantData: CreateEditPlantData) {
  return await Api({
    method: 'post',
    url: 'plant',
    data: {
      description: createPlantData.description.trim(),
      location: {
        coordinates: [createPlantData.longitude, createPlantData.latitude],
      },
      images: createPlantData.images,
      specie_id: createPlantData.specie_id,
    },
    hasToken: true,
  });
}

export async function editPlant({
  plantId,
  editPlantData,
}: {
  plantId: string;
  editPlantData: CreateEditPlantData;
}) {
  return await Api({
    method: 'patch',
    url: `plant/${plantId}`,
    data: {
      description: editPlantData.description.trim(),
      location: {
        coordinates: [editPlantData.latitude, editPlantData.longitude],
      },
      images: editPlantData.images,
      specie_id: editPlantData.specie_id,
    },
    hasToken: true,
  });
}
