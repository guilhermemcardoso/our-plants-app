import { create } from 'zustand';
import { Theme } from '~/types/theme';

interface SettingsState {
  theme: Theme;
  notificationEnabled: boolean;
  soundEnabled: boolean;
  setTheme: (theme: Theme) => void;
  setNotificationEnabled: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'dark',
  notificationEnabled: true,
  soundEnabled: true,
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
}));
