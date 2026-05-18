import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createUserSchema,
  type CreateUserFormValues,
} from "./createUser.schema";
import { useCreateUser } from "./useCreateUser";
import { Button } from "../../../components/ui/Button";

export const CreateUserForm = () => {
  const createUserMutation = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: CreateUserFormValues) => {
    createUserMutation.mutate(values, {
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
        <h2 className="text-lg font-semibold">Crear usuario</h2>
        <p className="text-sm text-slate-400">
          Crea usuarios normales dentro de tu tenant.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {createUserMutation.isError && (
        <p className="mt-3 text-sm text-red-400">
          {createUserMutation.error instanceof Error
            ? createUserMutation.error.message
            : "No se pudo crear el usuario"}
        </p>
      )}

      {createUserMutation.isSuccess && (
        <p className="mt-3 text-sm text-emerald-400">
          Usuario creado correctamente.
        </p>
      )}

      <Button
        type="submit"
        disabled={createUserMutation.isPending}
        className="mt-4"
      >
        {createUserMutation.isPending ? "Creando..." : "Crear usuario"}
      </Button>
    </form>
  );
};
