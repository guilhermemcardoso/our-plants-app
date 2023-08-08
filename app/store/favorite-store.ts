import { create } from 'zustand';
import { Plant } from '~/shared/types';

interface FavoriteState {
  favorites: Plant[];
  setFavorites: (favorites: Plant[]) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [],
  setFavorites: async (favorites) => {
    set((state) => ({
      ...state,
      favorites: favorites,
    }));
  },
}));
