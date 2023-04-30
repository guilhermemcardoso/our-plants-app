import { create } from 'zustand';

interface loadingState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<loadingState>((set) => ({
  isLoading: false,
  setIsLoading: async (isLoading) => {
    set((state) => ({
      ...state,
      isLoading: isLoading,
    }));
  },
}));
