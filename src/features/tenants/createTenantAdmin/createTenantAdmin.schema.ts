import { z } from "zod";

export const createTenantAdminSchema = z.object({
  email: z.email("Introduce un email valido"),
  password: z.string().min(8, "La password debe tener al menos 8 caracteres"),
});

export type CreateTenantAdminFormValues = z.infer<
  typeof createTenantAdminSchema
>;
