import { create } from 'zustand';
import { Plant } from '~/shared/types';

interface FavoritesState {
  favorites: Plant[];
  setFavorites: (favorites: Plant[]) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  setFavorites: async (favorites) => {
    set((state) => ({
      ...state,
      favorites: favorites,
    }));
  },
}));
