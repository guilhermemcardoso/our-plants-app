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
    url: `specie/list?page=${page}&items=${items}`,
    hasToken: true,
  });
}
