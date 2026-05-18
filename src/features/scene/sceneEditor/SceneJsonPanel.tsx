import { useMemo, useState } from "react";
import { Button } from "../../../components/ui/Button";
import type { SceneElement } from "../scene.types";

type SceneJsonPanelProps = {
  elements: SceneElement[];
  onChangeElements: (elements: SceneElement[]) => void;
};

export const SceneJsonPanel = ({
  elements,
  onChangeElements,
}: SceneJsonPanelProps) => {
  const [draftJson, setDraftJson] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  // This JSON is derived from the scene model. We compute it instead of storing
  // a duplicated copy in state.
  const currentJson = useMemo(() => {
    return JSON.stringify(
      {
        elements,
      },
      null,
      2,
    );
  }, [elements]);

  // While the user edits, we keep a local draft and only update the scene when
  // "Apply JSON" is clicked.
  const jsonValue = isEditing ? draftJson : currentJson;

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonValue);

      if (!Array.isArray(parsed.elements)) {
        setErrorMessage(
          "El JSON debe tener una propiedad elements de tipo array",
        );
        return;
      }

      onChangeElements(parsed.elements as SceneElement[]);
      setIsEditing(false);
      setDraftJson("");
      setErrorMessage(null);
    } catch {
      setErrorMessage("El JSON no es valido");
    }
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(jsonValue);
    setCopyMessage("JSON copiado");

    window.setTimeout(() => {
      setCopyMessage(null);
    }, 1500);
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">JSON de la escena</h2>
        <p className="text-sm text-slate-400">
          Edita o copia la representacion estructurada de los elementos.
        </p>
      </div>

      <textarea
        placeholder="Pega aqui tu escena"
        value={jsonValue}
        onChange={(event) => {
          setIsEditing(true);
          setDraftJson(event.target.value);
          setErrorMessage(null);
          setCopyMessage(null);
        }}
        className="min-h-[420px] w-full resize-y rounded-md border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 outline-none transition focus:border-cyan-400"
      />

      {isEditing && (
        <p className="mt-3 text-sm text-amber-300">
          Tienes cambios JSON sin aplicar.
        </p>
      )}

      {errorMessage && (
        <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
      )}

      {copyMessage && (
        <p className="mt-3 text-sm text-emerald-400">{copyMessage}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={applyJson}>
          Aplicar JSON
        </Button>

        <Button type="button" variant="secondary" onClick={copyJson}>
          Copiar
        </Button>
      </div>
    </div>
  );
};
