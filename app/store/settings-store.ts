import { create } from 'zustand';
import { Theme } from '~/types/theme';

interface SettingsState {
  theme: Theme;
  notificationEnabled: boolean;
  soundEnabled: boolean;
  distance: number;
  setTheme: (theme: Theme) => void;
  setNotificationEnabled: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setDistance: (distance: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'dark',
  notificationEnabled: true,
  soundEnabled: true,
  distance: 2000,
  setTheme: async (theme) => {
    set((state) => ({
      ...state,
      theme: theme,
    }));
  },
  setNotificationEnabled: async (enabled) => {
    set((state) => ({
      ...state,
      notificationEnabled: enabled,
    }));
  },
  setSoundEnabled: async (enabled) => {
    set((state) => ({
      ...state,
      soundEnabled: enabled,
    }));
  },
  setDistance: async (distance) => {
    set((state) => ({
      ...state,
      distance: distance,
    }));
  },
}));
