import { Plant } from '~/shared/types';

export interface MarkerProps {
  plant?: Plant;
  isUserLocation?: boolean;
  latitude: number;
  longitude: number;
  onPress?: (plant: Plant) => void;
}
