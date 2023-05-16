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
  onPress?: (location: Location) => void;
}
