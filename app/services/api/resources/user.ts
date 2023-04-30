import { Api } from '~/services/api';

export async function getCurrentUser() {
  return await Api({
    method: 'get',
    url: 'user/me',
    hasToken: true,
  });
}
