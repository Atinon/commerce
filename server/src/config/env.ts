import { z } from "zod";
import dotenv from "dotenv";

export const ENV_PATH = {
  development: ".env",
  test: ".env.test",
};

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

export function getEnv(path = ENV_PATH.development): Env {
  dotenv.config({
    path,
    override: true,
  });

  return envSchema.parse(process.env);
}
