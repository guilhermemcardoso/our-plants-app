import { Plant } from '~/shared/types';

export interface MarkerProps {
  plant: Plant;
  onPress?: (plant: Plant) => void;
}
