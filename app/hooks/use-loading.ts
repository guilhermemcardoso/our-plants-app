import { useCallback } from 'react';
import { useLoadingStore } from '~/store/loading-store';

export function useLoading() {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const isLoading = useLoadingStore((state) => state.isLoading);

  const setLoading = useCallback(
    (loading: boolean) => {
      setIsLoading(loading);
    },
    [setIsLoading]
  );

  return { isLoading, setLoading };
}
