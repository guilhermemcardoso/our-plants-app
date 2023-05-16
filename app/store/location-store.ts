import { create } from 'zustand';
import { Location } from '~/shared/types';

interface LocationState {
  currentLocation: Location | null;
  setCurrentLocation: (currentLocation: Location | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  setCurrentLocation: (currentLocation) =>
    set((state) => ({ ...state, currentLocation })),
}));
