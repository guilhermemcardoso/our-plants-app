import { Platform } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';

export function initializeMap() {
  MapboxGL.setWellKnownTileServer(getMapTile());
  MapboxGL.setAccessToken(MAPBOX_API_KEY);
  MapboxGL.setTelemetryEnabled(false);
}

export function getMapTile() {
  return Platform.OS === 'ios' ? 'mapbox' : 'Mapbox';
}
