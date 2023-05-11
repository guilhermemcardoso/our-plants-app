import { ViewStyle } from 'react-native';

export interface MapProps {
  children: React.ReactNode;
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  zoom?: number;
  style?: ViewStyle;
}
