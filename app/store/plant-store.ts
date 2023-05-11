import { create } from 'zustand';
import { Plant } from '~/shared/types';

interface PlantState {
  plants: Plant[];
  setPlants: (plants: Plant[]) => void;
}

export const usePlantStore = create<PlantState>((set) => ({
  plants: [],
  setPlants: async (plants) => {
    set((state) => ({
      ...state,
      plants: plants,
    }));
  },
}));
