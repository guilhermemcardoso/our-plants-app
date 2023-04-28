import { ViewStyle } from 'react-native';

export interface MapProps {
  children: React.ReactNode;
  latitude: number;
  longitude: number;
  style?: ViewStyle;
}
