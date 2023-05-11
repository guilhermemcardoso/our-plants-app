import { create } from 'zustand';
import { Specie } from '~/shared/types';

interface SpecieState {
  species: Specie[];
  setSpecies: (species: Specie[]) => void;
}

export const useSpecieStore = create<SpecieState>((set) => ({
  species: [],
  setSpecies: async (species) => {
    set((state) => ({
      ...state,
      species: species,
    }));
  },
}));
