import { Button } from "../../../components/ui/Button";
import type { SceneElementType } from "../scene.types";

type SceneToolbarProps = {
  onAddElement: (type: SceneElementType) => void;
  onClearScene: () => void;
};

export const SceneToolbar = ({
  onAddElement,
  onClearScene,
}: SceneToolbarProps) => {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Elementos</h2>
        <p className="text-sm text-slate-400">
          Anade elementos y muevelos sobre el canvas.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => onAddElement("vehicle")}>
          Vehiculo
        </Button>

        <Button type="button" onClick={() => onAddElement("obstacle")}>
          Obstaculo
        </Button>

        <Button type="button" onClick={() => onAddElement("reference")}>
          Referencia
        </Button>

        <Button type="button" variant="danger" onClick={onClearScene}>
          Limpiar
        </Button>
      </div>
    </div>
  );
};
