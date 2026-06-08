import express from "express";
import {
  errorMiddleware,
  notFoundMiddleware,
  requestLogger,
  sessionMiddleware,
} from "./middlewares/index.js";
import router from "./routes/index.js";
import type { Env } from "./config/env.js";
import { configureNunjucks, configurePrisma } from "./config/index.js";
import { configureLogger } from "./utils/logger/logger.js";

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

  await configurePrisma(env);

  // set up static files

  return app;
}
