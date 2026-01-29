import createApp from "./app.js";
import { getEnv, configureNunjucks, configurePrisma } from "./config/index.js";
import { ZodError } from "zod";

async function startServer() {
  try {
    const env = getEnv();
    const PORT = env.PORT;
    const app = createApp(env);

    configureNunjucks(app, env);
    app.set("view engine", "njk");

    await configurePrisma(env);

    // set up static files

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
