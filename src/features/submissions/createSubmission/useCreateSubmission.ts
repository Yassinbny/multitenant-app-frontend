import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createSubmission } from "../../../api/submissions.api";
import { useAuth } from "../../../hooks/useAuth";
import type { CreateSubmissionFormValues } from "./createSubmission.schema";

export const useCreateSubmission = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CreateSubmissionFormValues) =>
      createSubmission(values, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["submissions"],
      });

      navigate("/submissions");
    },
  });
};
