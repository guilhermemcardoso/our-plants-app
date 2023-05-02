import { Api } from '~/services/api';
import { User } from '~/shared/types';

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

export async function updateUserProfile(updateUserProfileData: User) {
  return await Api({
    method: 'patch',
    url: 'user/me',
    hasToken: true,
    data: updateUserProfileData,
  });
}
