import { CreateEditSpecieData } from '~/domains/specie/types';
import { Api } from '~/services/api';

export async function getSpecies({
  page,
  items,
}: {
  page: number;
  items: number;
}) {
  return await Api({
    method: 'get',
    url: `specie/list?page=${page}&perPage=${items}`,
    hasToken: true,
  });
}

export async function createSpecie(createSpecieData: CreateEditSpecieData) {
  return await Api({
    method: 'post',
    url: 'specie',
    data: createSpecieData,
    hasToken: true,
  });
}
