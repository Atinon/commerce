import { z } from "zod";
import dotenv from "dotenv";

export const ENV_PATH = {
  development: ".env",
  test: ".env.test",
};

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
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
