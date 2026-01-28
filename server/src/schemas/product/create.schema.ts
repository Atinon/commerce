import { z } from "zod";

const NAME_MIN_LEN = 2;

export const createProductSchema = z.object({
  name: z.string().min(NAME_MIN_LEN),
  price: z.int().positive(),
  stock: z.int().nonnegative().default(0),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
