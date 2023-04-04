import { SpecieIcons } from '../constants/icon';

export function formatSpecieIconName(specie: string) {
  return specie.replace(' ', '_').toUpperCase() as SpecieIcons;
}

export function getPlantIconBySpecie(specieIcon: SpecieIcons) {
  switch (specieIcon) {
    default:
      return require('~/assets/specie-icons/default.png');
  }
}
