import { z } from "zod";

export const userParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type UserParamsSchema = z.infer<typeof userParamsSchema>;
