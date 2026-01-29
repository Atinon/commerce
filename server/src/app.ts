import express from "express";
import {
  errorMiddleware,
  notFoundMiddleware,
  sessionMiddleware,
} from "./middlewares/index.js";
import router from "./routes/index.js";
import type { Env } from "./config/env.js";

export default function createApp(env: Env) {
  const app = express();

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
