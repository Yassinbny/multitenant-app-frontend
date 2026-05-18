import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createSubmissionSchema,
  type CreateSubmissionFormValues,
} from "./createSubmission.schema";
import { useCreateSubmission } from "./useCreateSubmission";
import { Button } from "../../../components/ui/Button";

export const CreateSubmissionForm = () => {
  const [step, setStep] = useState(1);
  const createSubmissionMutation = useCreateSubmission();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateSubmissionFormValues>({
    resolver: zodResolver(createSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      place: "",
      accidentTime: "",
      licensePlate: "",
      damageDescription: "",
    },
  });

  const goToNextStep = async () => {
    const isStepValid = await trigger(["firstName", "lastName", "place"]);

    if (isStepValid) {
      setStep(2);
    }
  };

  const onSubmit = (values: CreateSubmissionFormValues) => {
    createSubmissionMutation.mutate(values);
  };

  return (
    <form
      className="rounded-lg border border-slate-800 bg-slate-900 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6 flex items-center gap-3">
        <span
          className={
            step === 1
              ? "rounded-full bg-cyan-400 px-3 py-1 text-sm font-semibold text-slate-950"
              : "rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
          }
        >
          Paso 1
        </span>
        <span
          className={
            step === 2
              ? "rounded-full bg-cyan-400 px-3 py-1 text-sm font-semibold text-slate-950"
              : "rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
          }
        >
          Paso 2
        </span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Nombre
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Apellidos
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Lugar
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
              {...register("place")}
            />
            {errors.place && (
              <p className="mt-1 text-sm text-red-400">
                {errors.place.message}
              </p>
            )}
          </div>

          <Button type="button" onClick={goToNextStep}>
            Continuar
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Hora del accidente
            </label>
            <input
              type="time"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
              {...register("accidentTime")}
            />
            {errors.accidentTime && (
              <p className="mt-1 text-sm text-red-400">
                {errors.accidentTime.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Matricula
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
              {...register("licensePlate")}
            />
            {errors.licensePlate && (
              <p className="mt-1 text-sm text-red-400">
                {errors.licensePlate.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Descripcion de danos
            </label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-cyan-400"
              {...register("damageDescription")}
            />
            {errors.damageDescription && (
              <p className="mt-1 text-sm text-red-400">
                {errors.damageDescription.message}
              </p>
            )}
          </div>

          {createSubmissionMutation.isError && (
            <p className="text-sm text-red-400">
              {createSubmissionMutation.error instanceof Error
                ? createSubmissionMutation.error.message
                : "No se pudo crear el parte"}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep(1)}
            >
              Volver
            </Button>

            <Button type="submit" disabled={createSubmissionMutation.isPending}>
              {createSubmissionMutation.isPending
                ? "Guardando..."
                : "Guardar parte"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};
