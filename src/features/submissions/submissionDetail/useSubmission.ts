import { useQuery } from "@tanstack/react-query";
import { getSubmissionById } from "../../../api/submissions.api";
import { useAuth } from "../../../hooks/useAuth";

export const useSubmission = (submissionId: string | undefined) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["submission", submissionId],
    queryFn: () => getSubmissionById(submissionId as string, token as string),
    enabled: Boolean(token && submissionId),
  });
};
