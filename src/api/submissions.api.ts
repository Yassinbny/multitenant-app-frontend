import { baseApi } from "./baseApi";
import type {
  CreateSubmissionInput,
  SubmissionResponse,
  SubmissionsResponse,
  SubmissionSceneResponse,
  SubmissionScene,
} from "../features/submissions/submission.types";

export const getSubmissions = (token: string) => {
  return baseApi<SubmissionsResponse>("/submissions", {
    token,
  });
};

export const getSubmissionById = (submissionId: string, token: string) => {
  return baseApi<SubmissionResponse>(`/submissions/${submissionId}`, {
    token,
  });
};

export const createSubmission = (
  input: CreateSubmissionInput,
  token: string,
) => {
  return baseApi<SubmissionResponse>("/submissions", {
    method: "POST",
    body: input,
    token,
  });
};
export const getSubmissionScene = (submissionId: string, token: string) => {
  return baseApi<SubmissionSceneResponse>(
    `/submissions/${submissionId}/scene`,
    {
      token,
    },
  );
};

export const updateSubmissionScene = (
  submissionId: string,
  scene: SubmissionScene,
  token: string,
) => {
  return baseApi<SubmissionSceneResponse>(
    `/submissions/${submissionId}/scene`,
    {
      method: "PUT",
      body: scene,
      token,
    },
  );
};
export const deleteSubmission = (submissionId: string, token: string) => {
  return baseApi<void>(`/submissions/${submissionId}`, {
    method: "DELETE",
    token,
  });
};
