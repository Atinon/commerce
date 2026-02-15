import { z } from "zod";

export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const emailSchema = z.email();
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/\d/, "Password must contain at least one number.");

export const registerUserSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, "Password confirmation is required."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
