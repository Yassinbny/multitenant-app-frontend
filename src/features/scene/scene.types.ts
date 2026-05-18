export type SceneElementType = "vehicle" | "obstacle" | "reference";

export type SceneElement = {
  id: string;
  type: SceneElementType;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  label: string;
  color: string;
  notes?: string;
};
