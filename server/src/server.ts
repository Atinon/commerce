import app from "./app.js";
import { getEnv, configureNunjucks } from "./config/index.js";
import { ZodError } from "zod";

async function startServer() {
  try {
    const env = getEnv();
    const PORT = env.PORT;

    configureNunjucks(app, env);
    app.set("view engine", "njk");

    // set up static files

    // any async setup here (DB, cache, etc.)
    // await initializeDatabase(env.DB_URL);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Environment validation failed:");
      console.error(err.issues);
    } else {
      console.error("Unexpected error during startup:", err);
    }
    process.exit(1);
  }
}

startServer();
