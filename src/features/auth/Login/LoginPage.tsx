import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <section className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-cyan-400">
            Multitenant Accident Report
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Iniciar sesion</h1>
        </div>

        <LoginForm />
      </section>
    </main>
  );
};
