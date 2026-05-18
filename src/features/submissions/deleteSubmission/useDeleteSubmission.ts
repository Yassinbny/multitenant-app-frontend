import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubmission } from "../../../api/submissions.api";
import { useAuth } from "../../../hooks/useAuth";

export const useDeleteSubmission = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submissionId: string) =>
      deleteSubmission(submissionId, token as string),
    onSuccess: (_data, submissionId) => {
      queryClient.invalidateQueries({
        queryKey: ["submissions"],
      });

      queryClient.removeQueries({
        queryKey: ["submission", submissionId],
      });
    },
  });
};
