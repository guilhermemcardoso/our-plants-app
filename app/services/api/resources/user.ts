import { Api } from '~/services/api';

export async function getCurrentUser() {
  return await Api({
    method: 'get',
    url: 'user/me',
    hasToken: true,
  });
}

export async function removeProfileImage() {
  return await Api({
    method: 'delete',
    url: 'user/me/profile-image',
    hasToken: true,
  });
}
