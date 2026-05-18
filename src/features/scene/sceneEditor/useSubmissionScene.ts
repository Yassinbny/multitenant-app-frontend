import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSubmissionScene,
  updateSubmissionScene,
} from "../../../api/submissions.api";
import { useAuth } from "../../../hooks/useAuth";
import type { SubmissionScene } from "../../submissions/submission.types";

export const useSubmissionScene = (submissionId: string | undefined) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const sceneQuery = useQuery({
    queryKey: ["submission-scene", submissionId],
    queryFn: () => getSubmissionScene(submissionId as string, token as string),
    enabled: Boolean(submissionId && token),
  });

  const updateSceneMutation = useMutation({
    mutationFn: (scene: SubmissionScene) =>
      updateSubmissionScene(submissionId as string, scene, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["submission-scene", submissionId],
      });
    },
  });

  return {
    sceneQuery,
    updateSceneMutation,
  };
};
