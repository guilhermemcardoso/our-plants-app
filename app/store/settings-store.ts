import { create } from 'zustand';
import { getKey, setKey } from '~/services/local-storage';
import { StorageKeys } from '~/services/local-storage/constants';
import { Theme } from '~/types/theme';

interface SettingsState {
  theme: Theme;
  notificationEnabled: boolean;
  soundEnabled: boolean;
  loadSettings: () => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
  setNotificationEnabled: (enabled: boolean) => Promise<void>;
  setSoundEnabled: (enabled: boolean) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'dark',
  notificationEnabled: true,
  soundEnabled: true,
  loadSettings: async () => {
    const theme = await getKey(StorageKeys.THEME);
    const notificationEnabled = await getKey(StorageKeys.NOTIFICATIONS_ENABLED);
    const soundEnabled = await getKey(StorageKeys.SOUND_ENABLED);

    set((state) => ({
      ...state,
      theme: theme ? (theme as Theme) : 'dark',
      notificationEnabled: notificationEnabled
        ? JSON.parse(notificationEnabled)
        : true,
      soundEnabled: soundEnabled ? JSON.parse(soundEnabled) : true,
    }));
  },
  setTheme: async (theme) => {
    await setKey(StorageKeys.THEME, theme);

    set((state) => ({
      ...state,
      theme: theme,
    }));
  },
  setNotificationEnabled: async (enabled) => {
    await setKey(StorageKeys.NOTIFICATIONS_ENABLED, JSON.stringify(enabled));

    set((state) => ({
      ...state,
      notificationEnabled: enabled,
    }));
  },
  setSoundEnabled: async (enabled) => {
    await setKey(StorageKeys.SOUND_ENABLED, JSON.stringify(enabled));

    set((state) => ({
      ...state,
      soundEnabled: enabled,
    }));
  },
}));
