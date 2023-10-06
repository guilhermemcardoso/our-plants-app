import { create } from 'zustand';

interface alertState {
  showAlert: boolean;
  setShowAlert: (showAlert: boolean) => void;
  alertType: 'info' | 'warning' | 'success' | 'error' | (string & {});
  setAlertType: (
    alertType: 'info' | 'warning' | 'success' | 'error' | (string & {})
  ) => void;
  alertTitle: string;
  setAlertTitle: (title: string) => void;
  alertDescription: string;
  setAlertDescription: (title: string) => void;
}

export const useAlertStore = create<alertState>((set) => ({
  showAlert: false,
  setShowAlert: async (showAlert) => {
    set((state) => ({
      ...state,
      showAlert: showAlert,
    }));
  },
  alertType: 'success',
  setAlertType: async (alertType) => {
    set((state) => ({
      ...state,
      alertType: alertType,
    }));
  },
  alertTitle: '',
  setAlertTitle: async (title) => {
    set((state) => ({
      ...state,
      alertTitle: title,
    }));
  },
  alertDescription: '',
  setAlertDescription: async (description) => {
    set((state) => ({
      ...state,
      alertDescription: description,
    }));
  },
}));
