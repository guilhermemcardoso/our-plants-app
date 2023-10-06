import { useCallback } from 'react';
import { useAlertStore } from '~/store/alert-store';

export function useAlert() {
  const setShowAlert = useAlertStore((state) => state.setShowAlert);
  const setAlertType = useAlertStore((state) => state.setAlertType);
  const setAlertTitle = useAlertStore((state) => state.setAlertTitle);
  const setAlertDescription = useAlertStore(
    (state) => state.setAlertDescription
  );

  const showAlert = useCallback(
    ({
      alertType = 'success',
      title,
      description = '',
    }: {
      alertType: 'info' | 'warning' | 'success' | 'error' | (string & {});
      title: string;
      description?: string;
    }) => {
      setAlertType(alertType);
      setAlertTitle(title);
      setAlertDescription(description);
      setShowAlert(true);
    },
    [setShowAlert, setAlertDescription, setAlertType, setAlertTitle]
  );
  const closeAlert = useCallback(() => {
    setShowAlert(false);
  }, [setShowAlert]);

  return { closeAlert, showAlert };
}
