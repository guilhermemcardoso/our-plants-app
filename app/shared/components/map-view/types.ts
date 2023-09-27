import { ViewStyle } from 'react-native';
import { Location } from '~/shared/types';

export interface MapProps {
  children: React.ReactNode;
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  zoom?: number;
  style?: ViewStyle;
  onRegionChange?: ({
    latitude,
    longitude,
    zoomLevel = 14,
  }: {
    latitude: number;
    longitude: number;
    zoomLevel?: number;
  }) => void;
  onPress?: ({ location, zoom }: { location: Location; zoom?: number }) => void;
}
