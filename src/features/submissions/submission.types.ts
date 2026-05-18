import type { SceneElement } from "../scene/scene.types";

export type SubmissionScene = {
  elements: SceneElement[];
};

export type Submission = {
  id: string;
  firstName: string;
  lastName: string;
  place: string;
  accidentTime: string;
  licensePlate: string;
  damageDescription: string;
  scene: SubmissionScene | null;
  userId: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
};

export type SubmissionSceneResponse = {
  scene: SubmissionScene | null;
};
export type SubmissionsResponse = {
  submissions: Submission[];
};

export type SubmissionResponse = {
  submission: Submission;
};

export type CreateSubmissionInput = {
  firstName: string;
  lastName: string;
  place: string;
  accidentTime: string;
  licensePlate: string;
  damageDescription: string;
};
