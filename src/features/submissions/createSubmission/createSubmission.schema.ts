import { z } from "zod";

export const createSubmissionSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z
    .string()
    .min(2, "Los apellidos deben tener al menos 2 caracteres"),
  place: z.string().min(2, "El lugar debe tener al menos 2 caracteres"),
  accidentTime: z.string().min(1, "Selecciona la hora del accidente"),
  licensePlate: z
    .string()
    .min(3, "La matricula debe tener al menos 3 caracteres"),
  damageDescription: z
    .string()
    .min(5, "La descripcion debe tener al menos 5 caracteres"),
});

export type CreateSubmissionFormValues = z.infer<typeof createSubmissionSchema>;
