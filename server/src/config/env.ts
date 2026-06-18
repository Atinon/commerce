import { z } from "zod";

export const NODE_ENVS = {
  DEVELOPMENT: "development",
  TEST: "test",
  PRODUCTION: "production",
};

const envSchema = z.object({
  NODE_ENV: z.enum(Object.values(NODE_ENVS)),
  PORT: z.coerce.number().int().positive(),
  ASSETS_BASE_URL: z.string(),
  DATABASE_URL: z.url(),
  SESSION_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  return envSchema.parse(process.env);
}
