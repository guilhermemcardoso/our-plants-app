import { useCallback, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export default function useNetInfo() {
  const [isConnected, setIsConnected] = useState(false);

  const checkInternetConnection = useCallback(async () => {
    const result = await NetInfo.fetch();
    setIsConnected(!!result.isConnected);
  }, []);

  return { isConnected, checkInternetConnection };
}
