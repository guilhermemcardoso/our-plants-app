import { Api } from '~/services/api';

export async function getFavorites() {
  return await Api({
    method: 'get',
    url: 'favorite',
    hasToken: true,
  });
}

export async function addToFavorites(plantId: string) {
  return await Api({
    method: 'post',
    url: `favorite/${plantId}`,
    hasToken: true,
  });
}

export async function removeFromFavorites(plantId: string) {
  return await Api({
    method: 'delete',
    url: `favorite/${plantId}`,
    hasToken: true,
  });
}
