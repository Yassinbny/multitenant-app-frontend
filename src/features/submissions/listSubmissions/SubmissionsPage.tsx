import { Link } from "react-router";
import { formatDate } from "../../../utils/formatDate";
import { useSubmissions } from "./useSubmissions";

export const SubmissionsPage = () => {
  const { data, isLoading, isError, error } = useSubmissions();

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-cyan-400">Partes</p>
          <h1 className="text-2xl font-semibold">Partes de accidente</h1>
          <p className="mt-1 text-sm text-slate-400">
            Consulta y registra partes de accidente de coche.
          </p>
        </div>

        <Link
          to="/submissions/new"
          className="inline-flex cursor-pointer rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Nuevo parte
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm text-slate-400">Cargando partes...</p>
      )}

      {isError && (
        <p className="text-sm text-red-400">
          {error instanceof Error ? error.message : "No se pudieron cargar"}
        </p>
      )}

      {!isLoading && !isError && (
        <div className="overflow-hidden rounded-lg border border-slate-800">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Lugar</th>
                <th className="px-4 py-3 font-medium">Matricula</th>
                <th className="px-4 py-3 font-medium">Creado</th>
                <th className="px-4 py-3 font-medium">Accion</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {data?.submissions.map((submission) => (
                <tr key={submission.id} className="bg-slate-950">
                  <td className="px-4 py-3 text-slate-100">
                    {submission.firstName} {submission.lastName}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {submission.place}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {submission.licensePlate}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {formatDate(submission.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/submissions/${submission.id}`}
                      className="text-cyan-300 transition hover:text-cyan-200"
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}

              {data?.submissions.length === 0 && (
                <tr className="bg-slate-950">
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-slate-400"
                  >
                    Todavia no hay partes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
