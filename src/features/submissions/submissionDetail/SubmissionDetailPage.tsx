import { Link, useParams } from "react-router";
import { formatDateTime } from "../../../utils/formatDate";
import { useSubmission } from "./useSubmission";

export const SubmissionDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSubmission(id);

  if (isLoading) {
    return <p className="text-sm text-slate-400">Cargando parte...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-400">
        {error instanceof Error ? error.message : "No se pudo cargar el parte"}
      </p>
    );
  }

  if (!data?.submission) {
    return <p className="text-sm text-slate-400">Parte no encontrado.</p>;
  }

  const { submission } = data;

  return (
    <section>
      <div className="mb-6">
        <div className="flex flex-row gap-3">
          <Link
            to="/submissions"
            className="mt-4 inline-flex rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Volver a partes
          </Link>
          <Link
            to={`/submissions/${submission.id}/scene`}
            className="mt-4 inline-flex rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Ver/editar escena
          </Link>
        </div>

        <h1 className="mt-3 text-2xl font-semibold">
          Parte de {submission.firstName} {submission.lastName}
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Creado el {formatDateTime(submission.createdAt)}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <h2 className="mb-4 text-lg font-semibold">Datos personales</h2>

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Nombre</dt>
              <dd className="text-slate-100">{submission.firstName}</dd>
            </div>

            <div>
              <dt className="text-slate-500">Apellidos</dt>
              <dd className="text-slate-100">{submission.lastName}</dd>
            </div>

            <div>
              <dt className="text-slate-500">Lugar</dt>
              <dd className="text-slate-100">{submission.place}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <h2 className="mb-4 text-lg font-semibold">Datos del accidente</h2>

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Hora</dt>
              <dd className="text-slate-100">{submission.accidentTime}</dd>
            </div>

            <div>
              <dt className="text-slate-500">Matricula</dt>
              <dd className="text-slate-100">{submission.licensePlate}</dd>
            </div>

            <div>
              <dt className="text-slate-500">Descripcion de danos</dt>
              <dd className="text-slate-100">{submission.damageDescription}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
};
