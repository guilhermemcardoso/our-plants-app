import MapboxGL from '@rnmapbox/maps';
import { Platform } from 'react-native';

export function initializeMap() {
  MapboxGL.setWellKnownTileServer(getMapTile());
  MapboxGL.setAccessToken(
    'sk.eyJ1IjoiZ21jYXJkb3NvIiwiYSI6ImNsNzUxY2l0cTFuOHIzb3JsNWIzcWFlYjEifQ.-punpU01iuBMIJkeETWu9A'
  );
  MapboxGL.setTelemetryEnabled(false);
}

export function getMapTile() {
  return Platform.OS === 'ios' ? 'mapbox' : 'Mapbox';
}
