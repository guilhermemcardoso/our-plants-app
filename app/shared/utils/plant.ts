import { Plant } from '../types';

export function updatePlantList(plants: Plant[], plant: Plant) {
  const updatedList = plants.map((item) => {
    if (item._id === plant._id) {
      return plant;
    }

    return item;
  });

  return updatedList;
}
