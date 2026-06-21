import express from "express";
import { Env, configureNunjucks, configurePrisma } from "#config";
import {
  requestLogger,
  sessionMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "#middlewares";
import router from "#routes";
import { configureLogger } from "#utils/logger/logger.js";

export function createApp(env: Env) {
  const app = express();

  app.use(requestLogger);

  app.use(express.json());

  app.use(
    sessionMiddleware({
      secret: env.SESSION_SECRET,
      isProduction: env.NODE_ENV === "production",
    }),
  );

  app.use("/", router);

  app.use(notFoundMiddleware);

  app.use(errorMiddleware);

  return app;
}

export default async function bootstrapApp(env: Env) {
  configureLogger(env);

  const app = createApp(env);

  configureNunjucks(app, env);
  app.set("view engine", "njk");

  app.set("trust proxy", 1);

  await configurePrisma(env);

  // set up static files

  return app;
}
