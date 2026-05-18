import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createTenantAdminSchema,
  type CreateTenantAdminFormValues,
} from "./createTenantAdmin.schema";
import { useCreateTenantAdmin } from "./useCreateTenantAdmin";
import { Button } from "../../../components/ui/Button";

type CreateTenantAdminFormProps = {
  tenantId: string;
};

export const CreateTenantAdminForm = ({
  tenantId,
}: CreateTenantAdminFormProps) => {
  const createAdminMutation = useCreateTenantAdmin({ tenantId });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTenantAdminFormValues>({
    resolver: zodResolver(createTenantAdminSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: CreateTenantAdminFormValues) => {
    createAdminMutation.mutate(values, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form className="mt-3 space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Email admin
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {createAdminMutation.isError && (
        <p className="text-xs text-red-400">
          {createAdminMutation.error instanceof Error
            ? createAdminMutation.error.message
            : "No se pudo crear el admin"}
        </p>
      )}

      {createAdminMutation.isSuccess && (
        <p className="text-xs text-emerald-400">Admin creado correctamente.</p>
      )}

      <Button
        type="submit"
        variant="secondary"
        disabled={createAdminMutation.isPending}
        className="border-cyan-400 px-3 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950"
      >
        {createAdminMutation.isPending ? "Creando admin..." : "Crear admin"}
      </Button>
    </form>
  );
};
