import { useCallback } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { usePermissionStore } from '~/store/permission-store';

export function useLocation() {
  const isLocationAllowed = usePermissionStore(
    (state) => state.locationAllowed
  );
  const setIsLocationAllowed = usePermissionStore(
    (state) => state.setLocationAllowed
  );

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('COORDS', position.coords);
      },
      (error) => {
        console.log('ERRO NA LOCATION DO USUARIO', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  }, []);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result === 'granted') {
        setIsLocationAllowed(true);
      } else {
        setIsLocationAllowed(false);
      }
    } else {
      try {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de acesso a localização atual do dispositivo',
            message:
              'Para usufruir de todas as funcionalidades do aplicativo, é preciso ter acesso a sua localização atual.',
            buttonPositive: 'Entendi',
          }
        );
        if (result === 'granted') {
          setIsLocationAllowed(true);
        } else {
          setIsLocationAllowed(false);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, [setIsLocationAllowed]);

  return { isLocationAllowed, requestLocationPermission, getCurrentLocation };
}