import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { createComplaint as createComplaintMutation } from '~/services/api/resources/complaint';
import { useComplaintStore } from '~/store/complaint-store';
import { CreateComplaintData } from '~/domains/complaint/types';

export function useCreateComplaint() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setMyComplaints = useComplaintStore((state) => state.setMyComplaints);
  const myComplaints = useComplaintStore((state) => state.myComplaints);
  const done = useRef(true);

  const {
    mutate: createMutate,
    isLoading,
    data: createComplaintResponse,
  } = useMutation({
    mutationFn: createComplaintMutation,
  });

  useEffect(() => {
    if (!createComplaintResponse) {
      return;
    }

    const { response, status } = createComplaintResponse;
    if (!done.current) {
      done.current = true;
      setOnResponse({ status: status || 500, data: response });
      if (response.data) {
        setMyComplaints([...myComplaints, response.data.complaint]);
      }
    }
  }, [createComplaintResponse, setMyComplaints, myComplaints]);

  const createComplaint = async (complaintData: CreateComplaintData) => {
    createMutate(complaintData);
    done.current = false;
  };

  return { isLoading, createComplaint, onResponse };
}
