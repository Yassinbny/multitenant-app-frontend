import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export const ErrorPage = () => {
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Ha ocurrido un error";

  const message = isRouteErrorResponse(error)
    ? error.data
    : "No se pudo cargar esta pantalla.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <section className="w-full max-w-lg rounded-lg border border-slate-800 bg-slate-900 p-6 text-center shadow-xl">
        <p className="text-sm font-medium text-red-400">Error</p>
        <h1 className="mt-2 text-2xl font-semibold">{title}</h1>
        <p className="mt-3 text-sm text-slate-400">{String(message)}</p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Volver al dashboard
        </Link>
      </section>
    </main>
  );
};
