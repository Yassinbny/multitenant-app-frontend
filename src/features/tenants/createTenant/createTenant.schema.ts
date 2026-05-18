import { z } from "zod";

export const createTenantSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

export type CreateTenantFormValues = z.infer<typeof createTenantSchema>;
