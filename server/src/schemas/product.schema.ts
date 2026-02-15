import { z } from "zod";

const NAME_MIN_LEN = 2;

const productBaseSchema = z.object({
  name: z.string().min(NAME_MIN_LEN),
  price: z.int().positive(),
  stock: z.int().nonnegative(),
});

export const createProductSchema = productBaseSchema.extend({
  stock: productBaseSchema.shape.stock.default(0),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = productBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  })
  .transform((data) =>
    Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    ),
  );

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const productParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ProductParamsSchema = z.infer<typeof productParamsSchema>;
