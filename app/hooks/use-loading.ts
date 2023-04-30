import { useLoadingStore } from '~/store/loading-store';

export function useLoading() {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const isLoading = useLoadingStore((state) => state.isLoading);

  const setLoading = async (loading: boolean) => {
    setIsLoading(loading);
  };

  return { isLoading, setLoading };
}
