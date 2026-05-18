import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email("Introduce un email valido"),
  password: z.string().min(8, "La password debe tener al menos 8 caracteres"),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
