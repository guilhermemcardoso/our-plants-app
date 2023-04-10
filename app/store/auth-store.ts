import { create } from 'zustand';

interface AuthState {
  currentUser: any;
  accessToken: string | null;
  refreshToken: string | null;
  setCurrentUser: (currentUser: any) => void;
  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  setCurrentUser: (currentUser) => set((state) => ({ ...state, currentUser })),
  setAccessToken: (accessToken) => set((state) => ({ ...state, accessToken })),
  setRefreshToken: (refreshToken) =>
    set((state) => ({ ...state, refreshToken })),
}));
