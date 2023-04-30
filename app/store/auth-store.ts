import { create } from 'zustand';
import { User } from '~/shared/types';

interface AuthState {
  currentUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setCurrentUser: (currentUser: User | null) => void;
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
