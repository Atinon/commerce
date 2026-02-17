import { z } from "zod";
import { emailSchema, passwordSchema } from "./auth.schema.js";

export const userParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type UserParamsSchema = z.infer<typeof userParamsSchema>;

export const editUserSchema = z
  .object({
    email: emailSchema.optional(), // for now. email will probably not be able to be changed.
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  })
  .transform((data) =>
    Object.fromEntries(Object.entries(data).filter((_, v) => v !== undefined)),
  );

export type EditUserSchema = z.infer<typeof editUserSchema>;

export const changeAccountPasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: passwordSchema,
    newPasswordConfirmation: z
      .string()
      .min(1, "Password confirmation required."),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords do not match.",
    path: ["newPasswordConfirmation"],
  });

export type ChangeAccountPasswordSchema = z.infer<
  typeof changeAccountPasswordSchema
>;
