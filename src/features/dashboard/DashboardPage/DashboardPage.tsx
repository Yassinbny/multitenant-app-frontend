import { useAuth } from "../../../hooks/useAuth";

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-cyan-400">Dashboard</p>
            <h1 className="text-2xl font-semibold">
              Bienvenido, {user?.email}
            </h1>
            <p className="mt-1 text-sm text-slate-400">Rol: {user?.role}</p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Salir
          </button>
        </div>
      </div>
    </main>
  );
};
