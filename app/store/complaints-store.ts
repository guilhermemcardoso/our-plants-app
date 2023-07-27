import { create } from 'zustand';
import { Complaint } from '~/shared/types';

interface ComplaintsState {
  complaints: Complaint[];
  setComplaints: (complaints: Complaint[]) => void;
}

export const useComplaintsStore = create<ComplaintsState>((set) => ({
  complaints: [],
  setComplaints: async (complaints) => {
    set((state) => ({
      ...state,
      complaints: complaints,
    }));
  },
}));
