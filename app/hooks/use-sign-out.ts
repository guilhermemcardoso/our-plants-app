import { deleteKey } from '~/services/secure-storage';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { useAuthStore } from '~/store/auth-store';

export function useSignOut() {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  const signOut = async () => {
    await deleteKey(EncryptedKeys.CURRENT_USER);
    await deleteKey(EncryptedKeys.ACCESS_TOKEN);
    await deleteKey(EncryptedKeys.REFRESH_TOKEN);

    setCurrentUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return { signOut };
}
