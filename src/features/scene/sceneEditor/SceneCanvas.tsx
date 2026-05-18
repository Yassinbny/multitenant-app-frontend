import type Konva from "konva";
import { useEffect, useRef } from "react";
import {
  Circle,
  Group,
  Layer,
  Line,
  Rect,
  Stage,
  Text,
  Transformer,
} from "react-konva";
import type { SceneElement } from "../scene.types";

const STAGE_WIDTH = 760;
const STAGE_HEIGHT = 480;
const GRID_SIZE = 40;

const gridLines = [
  ...Array.from(
    { length: Math.floor(STAGE_WIDTH / GRID_SIZE) + 1 },
    (_, index) => ({
      points: [index * GRID_SIZE, 0, index * GRID_SIZE, STAGE_HEIGHT],
    }),
  ),
  ...Array.from(
    { length: Math.floor(STAGE_HEIGHT / GRID_SIZE) + 1 },
    (_, index) => ({
      points: [0, index * GRID_SIZE, STAGE_WIDTH, index * GRID_SIZE],
    }),
  ),
];

type SceneCanvasProps = {
  elements: SceneElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onMoveElement: (id: string, x: number, y: number) => void;
  onResizeElement: (
    id: string,
    width: number,
    height: number,
    x: number,
    y: number,
    rotation: number,
  ) => void;
};

export const SceneCanvas = ({
  elements,
  selectedElementId,
  onSelectElement,
  onMoveElement,
  onResizeElement,
}: SceneCanvasProps) => {
  // The Transformer must attach to the whole element group, not the inner shape.
  // This keeps position, resize and rotation synchronized.
  const transformerRef = useRef<Konva.Transformer>(null);
  const elementRefs = useRef<Record<string, Konva.Node>>({});

  // Whenever selection changes, attach the Transformer to the selected element group.
  useEffect(() => {
    const transformer = transformerRef.current;

    if (!transformer) {
      return;
    }

    const selectedNode = selectedElementId
      ? elementRefs.current[selectedElementId]
      : null;

    transformer.nodes(selectedNode ? [selectedNode] : []);
    transformer.getLayer()?.batchDraw();
  }, [selectedElementId, elements]);

  // Konva stores resize as scaleX/scaleY. We convert that temporary scale into
  // real width/height values so the exported JSON remains explicit and stable.
  const handleTransformEnd = (element: SceneElement) => {
    const node = elementRefs.current[element.id];

    if (!node) {
      return;
    }

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const nextWidth = Math.max(10, element.width * scaleX);
    const nextHeight = Math.max(10, element.height * scaleY);
    const nextRotation = node.rotation();

    node.scaleX(1);
    node.scaleY(1);

    onResizeElement(
      element.id,
      nextWidth,
      nextHeight,
      node.x(),
      node.y(),
      nextRotation,
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-3">
      <div className="flex justify-center overflow-auto">
        <Stage
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          className="rounded-md bg-slate-950"
          onMouseDown={(event) => {
            if (event.target === event.target.getStage()) {
              onSelectElement(null);
              transformerRef.current?.nodes([]);
            }
          }}
          onTouchStart={(event) => {
            if (event.target === event.target.getStage()) {
              onSelectElement(null);
              transformerRef.current?.nodes([]);
            }
          }}
        >
          <Layer>
            {gridLines.map((line, index) => (
              <Line
                key={`grid-line-${index}`}
                points={line.points}
                stroke="#1e293b"
                strokeWidth={1}
                listening={false}
              />
            ))}

            {elements.map((element) => {
              const isSelected = element.id === selectedElementId;

              return (
                <Group
                  key={element.id}
                  ref={(node) => {
                    if (node) {
                      elementRefs.current[element.id] = node;
                    }
                  }}
                  x={element.x}
                  y={element.y}
                  rotation={element.rotation}
                  draggable
                  onMouseDown={() => onSelectElement(element.id)}
                  onTouchStart={() => onSelectElement(element.id)}
                  onClick={() => onSelectElement(element.id)}
                  onTap={() => onSelectElement(element.id)}
                  onDragEnd={(event) => {
                    onMoveElement(
                      element.id,
                      event.target.x(),
                      event.target.y(),
                    );
                  }}
                  onTransformEnd={() => handleTransformEnd(element)}
                >
                  {element.type === "vehicle" ? (
                    <>
                      <Rect
                        x={0}
                        y={0}
                        width={element.width}
                        height={element.height}
                        fill={element.color}
                        cornerRadius={8}
                        stroke={isSelected ? "#ffffff" : "#0f172a"}
                        strokeWidth={isSelected ? 3 : 1}
                      />

                      <Rect
                        x={element.width * 0.28}
                        y={element.height * 0.18}
                        width={element.width * 0.44}
                        height={element.height * 0.38}
                        fill="#e0f2fe"
                        cornerRadius={4}
                        listening={false}
                      />

                      <Circle
                        x={element.width * 0.22}
                        y={element.height + 3}
                        radius={5}
                        fill="#020617"
                        listening={false}
                      />

                      <Circle
                        x={element.width * 0.78}
                        y={element.height + 3}
                        radius={5}
                        fill="#020617"
                        listening={false}
                      />

                      <Circle
                        x={element.width * 0.22}
                        y={-3}
                        radius={5}
                        fill="#020617"
                        listening={false}
                      />

                      <Circle
                        x={element.width * 0.78}
                        y={-3}
                        radius={5}
                        fill="#020617"
                        listening={false}
                      />

                      <Text
                        x={0}
                        y={0}
                        width={element.width}
                        height={element.height}
                        text={element.label}
                        fontSize={12}
                        fill="#0f172a"
                        align="center"
                        verticalAlign="middle"
                        listening={false}
                      />
                    </>
                  ) : (
                    <>
                      <Rect
                        x={0}
                        y={0}
                        width={element.width}
                        height={element.height}
                        fill={element.color}
                        stroke={isSelected ? "#ffffff" : "#0f172a"}
                        strokeWidth={isSelected ? 3 : 1}
                      />

                      <Text
                        x={0}
                        y={0}
                        width={element.width}
                        height={element.height}
                        text={element.label}
                        fontSize={12}
                        fill="#0f172a"
                        align="center"
                        verticalAlign="middle"
                        listening={false}
                      />
                    </>
                  )}
                </Group>
              );
            })}

            <Transformer
              ref={transformerRef}
              rotateEnabled
              enabledAnchors={[
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
                "middle-left",
                "middle-right",
              ]}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 10 || newBox.height < 10) {
                  return oldBox;
                }

                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
