import { ImageSourcePropType } from 'react-native';

export interface MarkerProps {
  icon: ImageSourcePropType;
  id: string;
  latitude: number;
  longitude: number;
  onPress?: (id: string) => void;
}
