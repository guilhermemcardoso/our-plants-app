import { create } from 'zustand';

interface permissionState {
  locationAllowed: boolean;
  setLocationAllowed: (status: boolean) => void;
}

export const usePermissionStore = create<permissionState>((set) => ({
  locationAllowed: false,
  setLocationAllowed: async (isAllowed) => {
    set((state) => ({
      ...state,
      locationAllowed: isAllowed,
    }));
  },
}));
