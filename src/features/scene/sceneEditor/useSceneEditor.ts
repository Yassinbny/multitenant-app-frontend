import { useState } from "react";
import type { SceneElement, SceneElementType } from "../scene.types";

// Centralized factory for creating scene elements with default visual properties.
// Keeping this here prevents sizes, colors and labels from being scattered across UI components.
const createElement = (type: SceneElementType): SceneElement => {
  const baseElement = {
    id: crypto.randomUUID(),
    type,
    x: 120,
    y: 120,
    rotation: 0,
    notes: "",
  };

  if (type === "vehicle") {
    return {
      ...baseElement,
      width: 90,
      height: 45,
      label: "Vehiculo",
      color: "#22d3ee",
    };
  }

  if (type === "obstacle") {
    return {
      ...baseElement,
      width: 55,
      height: 55,
      label: "Obstaculo",
      color: "#f97316",
    };
  }

  return {
    ...baseElement,
    width: 120,
    height: 12,
    label: "Referencia",
    color: "#a3e635",
  };
};

export const useSceneEditor = () => {
  // elements is the main scene data model.
  // Everything rendered by Konva and everything exported as JSON comes from this array.
  const [elements, setElements] = useState<SceneElement[]>([]);

  // Store only the selected id to keep the state small and stable.
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );

  const addElement = (type: SceneElementType) => {
    const element = createElement(type);

    setElements((currentElements) => [...currentElements, element]);
    setSelectedElementId(element.id);
  };

  // Updates any editable element property without losing the rest.
  // Used for changes such as label, rotation or notes.
  const updateElement = (
    id: string,
    updates: Partial<Omit<SceneElement, "id">>,
  ) => {
    setElements((currentElements) =>
      currentElements.map((element) =>
        element.id === id ? { ...element, ...updates } : element,
      ),
    );
  };

  // Synchronizes canvas drag and drop with the JSON model.
  const updateElementPosition = (id: string, x: number, y: number) => {
    setElements((currentElements) =>
      currentElements.map((element) =>
        element.id === id ? { ...element, x, y } : element,
      ),
    );
  };

  // Synchronizes visual Transformer changes with persistent model values.
  // Rotation is stored here as well because Konva applies it on the transformed node.
  const updateElementSize = (
    id: string,
    width: number,
    height: number,
    x: number,
    y: number,
    rotation: number,
  ) => {
    setElements((currentElements) =>
      currentElements.map((element) =>
        element.id === id
          ? { ...element, width, height, x, y, rotation }
          : element,
      ),
    );
  };

  // Allows the editable JSON panel to replace the whole scene when valid JSON is applied.
  const setElementsFromJson = (nextElements: SceneElement[]) => {
    setElements(nextElements);
    setSelectedElementId(null);
  };

  const clearScene = () => {
    setElements([]);
    setSelectedElementId(null);
  };

  return {
    elements,
    selectedElementId,
    addElement,
    updateElement,
    updateElementPosition,
    updateElementSize,
    setElementsFromJson,
    setSelectedElementId,
    clearScene,
  };
};
