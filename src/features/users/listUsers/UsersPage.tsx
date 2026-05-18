import { Button } from "../../../components/ui/Button";
import { formatDate } from "../../../utils/formatDate";
import { CreateUserForm } from "../createUsers/CreateUserForm";
import { useDeleteUser } from "../deleteUser/useDeleteUser";
import { useUsers } from "./useUsers";

export const UsersPage = () => {
  const { data, isLoading, isError, error } = useUsers();
  const deleteUserMutation = useDeleteUser();

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm text-cyan-400">Admin</p>
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <p className="mt-1 text-sm text-slate-400">
          Gestiona los usuarios normales de tu tenant.
        </p>
      </div>

      <CreateUserForm />

      {isLoading && (
        <p className="text-sm text-slate-400">Cargando usuarios...</p>
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
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Rol</th>
                <th className="px-4 py-3 font-medium">Creado</th>
                <th className="px-4 py-3 font-medium">Accion</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {data?.users.map((user) => (
                <tr key={user.id} className="bg-slate-950">
                  <td className="px-4 py-3 text-slate-100">{user.email}</td>
                  <td className="px-4 py-3 text-slate-400">{user.role}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      type="button"
                      variant="danger"
                      className="px-2 py-1 text-xs"
                      disabled={deleteUserMutation.isPending}
                      onClick={() => {
                        if (
                          window.confirm(
                            "¿Seguro que quieres eliminar este usuario?",
                          )
                        ) {
                          deleteUserMutation.mutate(user.id);
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}

              {data?.users.length === 0 && (
                <tr className="bg-slate-950">
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-slate-400"
                  >
                    Todavia no hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {deleteUserMutation.isError && (
        <p className="mt-3 text-sm text-red-400">
          {deleteUserMutation.error instanceof Error
            ? deleteUserMutation.error.message
            : "No se pudo eliminar el usuario"}
        </p>
      )}
    </section>
  );
};
