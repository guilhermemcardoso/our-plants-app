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
  onRegionChange: (latitude: number, longitude: number) => void;
  onPress?: (location: Location) => void;
}
