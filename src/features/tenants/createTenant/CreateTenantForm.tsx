import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createTenantSchema,
  type CreateTenantFormValues,
} from "./createTenant.schema";
import { useCreateTenant } from "./useCreateTenant";
import { Button } from "../../../components/ui/Button";

export const CreateTenantForm = () => {
  const createTenantMutation = useCreateTenant();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTenantFormValues>({
    resolver: zodResolver(createTenantSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: CreateTenantFormValues) => {
    createTenantMutation.mutate(values.name, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      className="mb-6 rounded-lg border border-slate-800 bg-slate-900 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Crear tenant</h2>
        <p className="text-sm text-slate-400">
          Registra una nueva empresa en la plataforma.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label
            htmlFor="tenant-name"
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            Nombre
          </label>
          <input
            id="tenant-name"
            type="text"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            disabled={createTenantMutation.isPending}
            className="w-full sm:w-auto"
          >
            {createTenantMutation.isPending ? "Creando..." : "Crear"}
          </Button>
        </div>
      </div>

      {createTenantMutation.isError && (
        <p className="mt-3 text-sm text-red-400">
          {createTenantMutation.error instanceof Error
            ? createTenantMutation.error.message
            : "No se pudo crear el tenant"}
        </p>
      )}
    </form>
  );
};
