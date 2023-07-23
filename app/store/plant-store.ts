import { create } from 'zustand';
import { Plant } from '~/shared/types';

interface PlantState {
  plants: Plant[];
  selectedPlant?: Plant;
  setPlants: (plants: Plant[]) => void;
  setSelectedPlant: (plant: Plant) => void;
}

export const usePlantStore = create<PlantState>((set) => ({
  plants: [],
  selectedPlant: undefined,
  setPlants: async (plants) => {
    set((state) => ({
      ...state,
      plants: plants,
    }));
  },
  setSelectedPlant: async (plant) => {
    set((state) => ({
      ...state,
      selectedPlant: plant,
    }));
  },
}));
