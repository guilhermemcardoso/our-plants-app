import { create } from 'zustand';
import { Complaint } from '~/shared/types';

interface ComplaintState {
  complaints: Complaint[];
  complaintsPage: number;
  hasNextComplaints: boolean;
  setComplaints: (complaints: Complaint[]) => void;
  setComplaintsPage: (complaintsPage: number) => void;
  setHasNextComplaints: (hasNext: boolean) => void;
  myComplaints: Complaint[];
  myComplaintsPage: number;
  hasNextMyComplaints: boolean;
  setMyComplaints: (complaints: Complaint[]) => void;
  setMyComplaintsPage: (myComplaintsPage: number) => void;
  setHasNextMyComplaints: (hasNext: boolean) => void;
}

export const useComplaintStore = create<ComplaintState>((set) => ({
  complaints: [],
  complaintsPage: 1,
  hasNextComplaints: false,
  myComplaints: [],
  myComplaintsPage: 1,
  hasNextMyComplaints: false,
  setComplaints: async (complaints) => {
    set((state) => ({
      ...state,
      complaints: complaints,
    }));
  },
  setComplaintsPage: async (complaintsPage) => {
    set((state) => ({
      ...state,
      complaintsPage: complaintsPage,
    }));
  },
  setHasNextComplaints: async (hasNext) => {
    set((state) => ({
      ...state,
      hasNextComplaints: hasNext,
    }));
  },
  setMyComplaints: async (complaints) => {
    set((state) => ({
      ...state,
      myComplaints: complaints,
    }));
  },
  setMyComplaintsPage: async (myComplaintsPage) => {
    set((state) => ({
      ...state,
      myComplaintsPage: myComplaintsPage,
    }));
  },
  setHasNextMyComplaints: async (hasNext) => {
    set((state) => ({
      ...state,
      hasNextMyComplaints: hasNext,
    }));
  },
}));
