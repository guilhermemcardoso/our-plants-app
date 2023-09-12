import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { evaluateComplaint as evaluateComplaintMutation } from '~/services/api/resources/complaint';
import { useComplaintStore } from '~/store/complaint-store';
import { EncryptedKeys } from '~/services/secure-storage/constants';
import { setKey } from '~/services/secure-storage';
import { useAuthStore } from '~/store/auth-store';

export function useEvaluateComplaint() {
  const [onResponse, setOnResponse] = useState<{
    data: any;
    status: number | undefined;
  }>({ data: undefined, status: undefined });
  const setComplaints = useComplaintStore((state) => state.setComplaints);
  const complaints = useComplaintStore((state) => state.complaints);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const currentUser = useAuthStore((state) => state.currentUser);

  const done = useRef(true);

  const {
    mutate: evaluateMutate,
    isLoading,
    data: evaluateComplaintResponse,
  } = useMutation({
    mutationFn: evaluateComplaintMutation,
  });

  useEffect(() => {
    if (!evaluateComplaintResponse) {
      return;
    }

    const { response, status } = evaluateComplaintResponse;
    if (!done.current) {
      done.current = true;
      setOnResponse({ status: status || 500, data: response });
      if (response.data) {
        const { complaint } = response.data;
        if (currentUser) {
          const updatedCurrentUser = {
            ...response.data.plant.created_by,
            mapped_plants: (currentUser.mapped_plants || 0) + 1,
          };
          setCurrentUser(updatedCurrentUser);
          setKey(
            EncryptedKeys.CURRENT_USER,
            JSON.stringify(updatedCurrentUser)
          );
        }

        setComplaints(
          complaints.map((item) => {
            if (complaint._id === item._id) {
              return complaint;
            }
            return item;
          })
        );
      }
    }
  }, [
    evaluateComplaintResponse,
    setCurrentUser,
    currentUser,
    setComplaints,
    complaints,
  ]);

  const evaluateComplaint = async (
    complaintId: string,
    evaluation: string,
    wasHelpful: boolean
  ) => {
    evaluateMutate({
      complaintId: complaintId,
      evaluation: evaluation,
      wasHelpful: wasHelpful,
    });
    done.current = false;
  };

  return { isLoading, evaluateComplaint, onResponse };
}
