import { CreateTenantForm } from "../createTenant/CreateTenantForm";
import { CreateTenantAdminForm } from "../createTenantAdmin/CreateTenantAdminForm";
import { formatDate } from "../../../utils/formatDate";
import { useTenants } from "./useTenants";

export const TenantsPage = () => {
  const { data, isLoading, isError, error } = useTenants();

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm text-cyan-400">Super admin</p>
        <h1 className="text-2xl font-semibold">Tenants</h1>
        <p className="mt-1 text-sm text-slate-400">
          Gestiona empresas y crea administradores para cada tenant.
        </p>
      </div>

      <CreateTenantForm />

      {isLoading && (
        <p className="text-sm text-slate-400">Cargando tenants...</p>
      )}

      {isError && (
        <p className="text-sm text-red-400">
          {error instanceof Error ? error.message : "No se pudieron cargar"}
        </p>
      )}

      {!isLoading && !isError && data?.tenants.length === 0 && (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-center text-sm text-slate-400">
          Todavia no hay tenants registrados.
        </div>
      )}

      {!isLoading && !isError && Boolean(data?.tenants.length) && (
        <div className="grid gap-4 lg:grid-cols-2">
          {data?.tenants.map((tenant) => (
            <article
              key={tenant.id}
              className="rounded-lg border border-slate-800 bg-slate-900 p-4"
            >
              <div>
                <p className="text-lg font-semibold text-slate-100">
                  {tenant.name}
                </p>
                <p className="mt-1 break-all text-xs text-slate-500">
                  {tenant.id}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Creado: {formatDate(tenant.createdAt)}
                </p>
              </div>

              <div className="mt-4 border-t border-slate-800 pt-4">
                <p className="text-sm font-medium text-slate-200">
                  Crear admin para este tenant
                </p>
                <CreateTenantAdminForm tenantId={tenant.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
