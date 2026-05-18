import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { Button } from "../../../components/ui/Button";
import { SceneCanvas } from "./SceneCanvas";
import { SceneJsonPanel } from "./SceneJsonPanel";
import { SceneToolbar } from "./SceneToolbar";
import { useSceneEditor } from "./useSceneEditor";
import { useSubmissionScene } from "./useSubmissionScene";

export const SceneEditorPage = () => {
  const { id } = useParams();
  const hasLoadedInitialScene = useRef(false);

  const {
    elements,
    selectedElementId,
    addElement,
    updateElementPosition,
    updateElementSize,
    setElementsFromJson,
    setSelectedElementId,
    clearScene,
  } = useSceneEditor();

  const { sceneQuery, updateSceneMutation } = useSubmissionScene(id);

  useEffect(() => {
    if (hasLoadedInitialScene.current || !sceneQuery.data) {
      return;
    }

    setElementsFromJson(sceneQuery.data.scene?.elements ?? []);
    hasLoadedInitialScene.current = true;
  }, [sceneQuery.data, setElementsFromJson]);

  const saveScene = () => {
    updateSceneMutation.mutate({
      elements,
    });
  };

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/submissions"
            className="text-sm text-cyan-300 transition hover:text-cyan-200"
          >
            Volver a partes
          </Link>

          <p className="mt-4 text-sm text-cyan-400">Representacion visual</p>
          <h1 className="text-2xl font-semibold">Editor de escena</h1>
          <p className="mt-1 text-sm text-slate-400">
            Recrea una escena basica de accidente mediante elementos
            interactivos.
          </p>
        </div>

        {id && (
          <Button
            type="button"
            onClick={saveScene}
            disabled={updateSceneMutation.isPending}
          >
            {updateSceneMutation.isPending ? "Guardando..." : "Guardar escena"}
          </Button>
        )}
      </div>

      {sceneQuery.isLoading && (
        <p className="mb-4 text-sm text-slate-400">Cargando escena...</p>
      )}

      {sceneQuery.isError && (
        <p className="mb-4 text-sm text-red-400">
          {sceneQuery.error instanceof Error
            ? sceneQuery.error.message
            : "No se pudo cargar la escena"}
        </p>
      )}

      {updateSceneMutation.isSuccess && (
        <p className="mb-4 text-sm text-emerald-400">
          Escena guardada correctamente.
        </p>
      )}

      {updateSceneMutation.isError && (
        <p className="mb-4 text-sm text-red-400">
          {updateSceneMutation.error instanceof Error
            ? updateSceneMutation.error.message
            : "No se pudo guardar la escena"}
        </p>
      )}

      <div className="mb-4">
        <SceneToolbar onAddElement={addElement} onClearScene={clearScene} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <SceneCanvas
          elements={elements}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
          onMoveElement={updateElementPosition}
          onResizeElement={updateElementSize}
        />

        <SceneJsonPanel
          elements={elements}
          onChangeElements={setElementsFromJson}
        />
      </div>
    </section>
  );
};
