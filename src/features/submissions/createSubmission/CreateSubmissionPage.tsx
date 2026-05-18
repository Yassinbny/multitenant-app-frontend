import { CreateSubmissionForm } from "./CreateSubmissionForm";

export const CreateSubmissionPage = () => {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm text-cyan-400">Nuevo parte</p>
        <h1 className="text-2xl font-semibold">Crear parte de accidente</h1>
        <p className="mt-1 text-sm text-slate-400">
          Completa los datos del parte en dos pasos.
        </p>
      </div>

      <CreateSubmissionForm />
    </section>
  );
};
