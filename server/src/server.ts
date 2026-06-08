import bootstrapApp from "./app.js";
import { getEnv } from "./config/index.js";
import { ZodError } from "zod";
import { logger } from "./utils/logger/logger.js";

async function startServer() {
  try {
    const env = getEnv();
    const PORT = env.PORT;
    const app = await bootstrapApp(env);

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (err) {
    if (err instanceof ZodError) {
      logger.error("Environment validation failed", { err: err.issues });
    } else {
      logger.error("Unexpected error during startup:", { err });
    }
    process.exit(1);
  }
}

startServer();
