import { create } from 'zustand';

interface AuthState {
  currentUser: any;
  accessToken: string | null;
  refreshToken: string | null;
  setCurrentUser: (currentUser: any) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  setCurrentUser: (data) => set((state) => ({ ...state, currentUser: data })),
  setAccessToken: (data) => set((state) => ({ ...state, accessToken: data })),
  setRefreshToken: (data) => set((state) => ({ ...state, refreshToken: data })),
}));
