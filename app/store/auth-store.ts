import { create } from 'zustand';
import { Api } from '~/services/api';
import { deleteKey, getKey, setKey } from '~/services/secure-store';
import { EncryptedKeys } from '~/services/secure-store/constants';

interface AuthState {
  currentUser: any;
  accessToken: string | null;
  refreshToken: string | null;
  checkCurrentUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  checkCurrentUser: async () => {
    const currentUser = await getKey(EncryptedKeys.CURRENT_USER);
    const accessToken = await getKey(EncryptedKeys.ACCESS_TOKEN);
    const refreshToken = await getKey(EncryptedKeys.REFRESH_TOKEN);

    set((state) => ({
      ...state,
      currentUser: currentUser ? JSON.parse(currentUser) : currentUser,
      accessToken,
      refreshToken,
    }));
  },
  signIn: async (email, password) => {
    const { response } = await Api({
      method: 'post',
      url: 'auth/login',
      data: { email, password },
    });

    if (
      response.data &&
      response.data.user &&
      response.data.access_token &&
      response.data.refresh_token
    ) {
      const { user, access_token, refresh_token } = response.data;
      await setKey(EncryptedKeys.CURRENT_USER, JSON.stringify(user));
      await setKey(EncryptedKeys.ACCESS_TOKEN, access_token);
      await setKey(EncryptedKeys.REFRESH_TOKEN, refresh_token);

      set((state) => ({
        ...state,
        currentUser: user,
        accessToken: access_token,
        refreshToken: refresh_token,
      }));
    }
  },
  signOut: async () => {
    await deleteKey(EncryptedKeys.CURRENT_USER);
    await deleteKey(EncryptedKeys.ACCESS_TOKEN);
    await deleteKey(EncryptedKeys.REFRESH_TOKEN);
  },
}));
