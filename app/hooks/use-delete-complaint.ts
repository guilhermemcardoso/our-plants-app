import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { deleteComplaint as deleteComplaintMutation } from '~/services/api/resources/complaint';
import { useComplaintStore } from '~/store/complaint-store';

export function useDeleteComplaint() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setMyComplaints = useComplaintStore((state) => state.setMyComplaints);
  const myComplaints = useComplaintStore((state) => state.myComplaints);
  const done = useRef(true);
  const complaintIdRef = useRef('');

  const {
    mutate: deleteMutate,
    isLoading,
    data: deleteComplaintResponse,
  } = useMutation({
    mutationFn: deleteComplaintMutation,
  });

  useEffect(() => {
    if (!deleteComplaintResponse) {
      return;
    }

    const { response, status } = deleteComplaintResponse;
    if (!done.current) {
      done.current = true;
      setOnResponse({ status: status || 500, data: response });
      if (response.data) {
        setMyComplaints(
          myComplaints.filter(
            (complaint) => complaint._id !== complaintIdRef.current
          )
        );
      }
    }
  }, [deleteComplaintResponse, setMyComplaints, myComplaints]);

  const deleteComplaint = async (complaintId: string) => {
    deleteMutate(complaintId);
    done.current = false;
    complaintIdRef.current = complaintId;
  };

  return { isLoading, deleteComplaint, onResponse };
}
