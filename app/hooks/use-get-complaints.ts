import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getComplaints as getComplaintsMutation } from '~/services/api/resources/complaint';
import { Complaint } from '~/shared/types';
import { useComplaintsStore } from '~/store/complaints-store';

export function useGetComplaints() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setComplaints = useComplaintsStore((state) => state.setComplaints);

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

      const { items } = response.data;

      setComplaints(items as Complaint[]);
    }
  }, [getComplaintsResponse, setComplaints]);

  const getComplaints = useCallback(
    async ({
      page,
      perPage,
      closed,
      opened,
    }: {
      page: number;
      perPage: number;
      closed: boolean;
      opened: boolean;
    }) => {
      mutate({ page, perPage, closed, opened });
      done.current = false;
    },
    [mutate]
  );

  return { isLoading, getComplaints, onResponse };
}
