import { Plant } from '~/shared/types';

export interface MarkerProps {
  plant?: Plant;
  latitude: number;
  longitude: number;
  onPress?: (plant: Plant) => void;
}
