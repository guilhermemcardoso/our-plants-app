import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getComplaints as getComplaintsMutation } from '~/services/api/resources/complaint';
import { PER_PAGE } from '~/shared/constants/constants';
import { Complaint } from '~/shared/types';
import { useComplaintStore } from '~/store/complaint-store';

export function useGetComplaints() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const complaints = useComplaintStore((state) => state.complaints);
  const setComplaints = useComplaintStore((state) => state.setComplaints);
  const complaintsPage = useComplaintStore((state) => state.complaintsPage);
  const setComplaintsPage = useComplaintStore(
    (state) => state.setComplaintsPage
  );
  const setHasNextComplaints = useComplaintStore(
    (state) => state.setHasNextComplaints
  );

  const {
    mutate,
    isLoading,
    data: getComplaintsResponse,
  } = useMutation({
    mutationFn: getComplaintsMutation,
  });
  const done = useRef(true);

  useEffect(() => {
    if (!getComplaintsResponse) {
      return;
    }

    const { response, status } = getComplaintsResponse;
    setOnResponse({ status, data: response?.data.items || [] });

    if (!done.current && response.data) {
      done.current = true;

      const { items, hasNext } = response.data;

      setComplaints([...complaints, ...(items as Complaint[])]);
      setHasNextComplaints(!!hasNext);
    }
  }, [getComplaintsResponse, complaints, setComplaints, setHasNextComplaints]);

  const getComplaints = useCallback(
    async (showClosed: boolean) => {
      setComplaints([]);
      mutate({
        page: complaintsPage,
        perPage: PER_PAGE,
        closed: showClosed,
        opened: true,
      });
      done.current = false;
    },
    [mutate, complaintsPage, setComplaints]
  );

  const loadMoreComplaints = useCallback(
    async (showClosed: boolean) => {
      mutate({
        page: complaintsPage + 1,
        perPage: PER_PAGE,
        closed: showClosed,
        opened: true,
      });
      setComplaintsPage(complaintsPage + 1);
      done.current = false;
    },
    [mutate, complaintsPage, setComplaintsPage]
  );

  return { isLoading, getComplaints, loadMoreComplaints, onResponse };
}
