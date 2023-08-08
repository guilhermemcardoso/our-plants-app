import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getMyComplaints as getMyComplaintsMutation } from '~/services/api/resources/complaint';
import { PER_PAGE } from '~/shared/constants/constants';
import { Complaint } from '~/shared/types';
import { useComplaintStore } from '~/store/complaint-store';

export function useGetMyComplaints() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const myComplaints = useComplaintStore((state) => state.myComplaints);
  const setMyComplaints = useComplaintStore((state) => state.setMyComplaints);
  const myComplaintsPage = useComplaintStore((state) => state.myComplaintsPage);
  const setMyComplaintsPage = useComplaintStore(
    (state) => state.setMyComplaintsPage
  );
  const setHasNextMyComplaints = useComplaintStore(
    (state) => state.setHasNextMyComplaints
  );

  const {
    mutate,
    isLoading,
    data: getMyComplaintsResponse,
  } = useMutation({
    mutationFn: getMyComplaintsMutation,
  });
  const done = useRef(true);

  useEffect(() => {
    if (!getMyComplaintsResponse) {
      return;
    }

    const { response, status } = getMyComplaintsResponse;
    setOnResponse({ status, data: response?.data.items || [] });

    if (!done.current && response.data) {
      done.current = true;

      const { items, hasNext } = response.data;

      setHasNextMyComplaints(!!hasNext);
      setMyComplaints([...myComplaints, ...(items as Complaint[])]);
    }
  }, [
    getMyComplaintsResponse,
    myComplaints,
    setMyComplaints,
    setHasNextMyComplaints,
  ]);

  const getMyComplaints = useCallback(
    async (showClosed: boolean) => {
      setMyComplaints([]);
      mutate({
        page: myComplaintsPage,
        perPage: PER_PAGE,
        closed: showClosed,
        opened: true,
      });
      done.current = false;
    },
    [mutate, setMyComplaints, myComplaintsPage]
  );

  const loadMoreMyComplaints = useCallback(
    async (showClosed: boolean) => {
      mutate({
        page: myComplaintsPage + 1,
        perPage: PER_PAGE,
        closed: showClosed,
        opened: true,
      });
      setMyComplaintsPage(myComplaintsPage + 1);
      done.current = false;
    },
    [mutate, myComplaintsPage, setMyComplaintsPage]
  );

  return { isLoading, getMyComplaints, loadMoreMyComplaints, onResponse };
}
