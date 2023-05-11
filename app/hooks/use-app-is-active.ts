import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

export default function useAppIsActive(callback: Function) {
  const appStateRef = useRef(AppState.currentState);
  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        callback();
      }

      appStateRef.current = nextAppState;
    },
    [callback]
  );

  useEffect(() => {
    const event = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      event.remove();
    };
  }, [handleAppStateChange]);
}
