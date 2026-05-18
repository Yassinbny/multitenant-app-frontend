import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Introduce un email valido"),
  password: z.string().min(1, "Introduce tu password"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
