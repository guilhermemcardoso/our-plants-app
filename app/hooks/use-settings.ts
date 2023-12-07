import { getKey, setKey } from '~/services/local-storage';
import { StorageKeys } from '~/services/local-storage/constants';
import { useSettingsStore } from '~/store/settings-store';
import { Theme } from '~/types/theme';

export function useSettings() {
  const setNotificationEnabledState = useSettingsStore(
    (state) => state.setNotificationEnabled
  );
  const setSoundEnabledState = useSettingsStore(
    (state) => state.setSoundEnabled
  );
  const setThemeState = useSettingsStore((state) => state.setTheme);
  const setDistanceState = useSettingsStore((state) => state.setDistance);
  const theme = useSettingsStore((state) => state.theme);
  const notificationEnabled = useSettingsStore(
    (state) => state.notificationEnabled
  );
  const soundEnabled = useSettingsStore((state) => state.soundEnabled);
  const distance = useSettingsStore((state) => state.distance);

  const loadSettings = async () => {
    const themeValue = await getKey(StorageKeys.THEME);
    const notificationEnabledValue = await getKey(
      StorageKeys.NOTIFICATIONS_ENABLED
    );
    const soundEnabledValue = await getKey(StorageKeys.SOUND_ENABLED);
    const distanceValue = await getKey(StorageKeys.DISTANCE);

    setThemeState(themeValue ? (themeValue as Theme) : 'dark');
    setNotificationEnabledState(
      notificationEnabledValue ? JSON.parse(notificationEnabledValue) : true
    );
    setSoundEnabledState(
      soundEnabledValue ? JSON.parse(soundEnabledValue) : true
    );
    setDistanceState(distanceValue ? Number(distanceValue) : 2000);
  };

  const setNotificationEnabled = async (value: boolean) => {
    setNotificationEnabledState(value);
    setKey(StorageKeys.NOTIFICATIONS_ENABLED, JSON.stringify(value));
  };
  const setSoundEnabled = async (value: boolean) => {
    setSoundEnabledState(value);
    setKey(StorageKeys.SOUND_ENABLED, JSON.stringify(value));
  };
  const setTheme = async (value: Theme) => {
    setThemeState(value);
    setKey(StorageKeys.THEME, value);
  };

  const setDistance = async (value: number) => {
    setDistanceState(value);
    setKey(StorageKeys.DISTANCE, JSON.stringify(value));
  };

  return {
    loadSettings,
    setNotificationEnabled,
    setSoundEnabled,
    setTheme,
    setDistance,
    notificationEnabled,
    soundEnabled,
    distance,
    theme,
  };
}
