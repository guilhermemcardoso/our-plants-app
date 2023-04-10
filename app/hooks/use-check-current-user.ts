import { getKey } from '~/services/secure-storage';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { useAuthStore } from '~/store/auth-store';

export function useCheckCurrentUser() {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  const checkCurrentUser = async () => {
    const currentUser = await getKey(EncryptedKeys.CURRENT_USER);
    const accessToken = await getKey(EncryptedKeys.ACCESS_TOKEN);
    const refreshToken = await getKey(EncryptedKeys.REFRESH_TOKEN);

    setCurrentUser(currentUser ? JSON.parse(currentUser) : currentUser);
    if (accessToken) {
      setAccessToken(accessToken);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  };

  return { checkCurrentUser };
}
