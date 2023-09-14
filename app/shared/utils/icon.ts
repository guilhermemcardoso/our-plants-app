import { SPECIE_IDS, SpecieIcons } from '../constants/icon';

export function getPlantIconBySpecie(specieId: string) {
  const icon = SpecieIcons[specieId as SPECIE_IDS];
  if (!icon) {
    return require('~/assets/specie-icons/default.png');
  }

  return icon;
}
