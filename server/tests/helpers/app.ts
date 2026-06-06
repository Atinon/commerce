import bootstrapApp from "../../src/app.js";
import { ENV_PATH, getEnv } from "../../src/config/index.js";

export async function createTestApp() {
  const env = getEnv(ENV_PATH.test);

  return bootstrapApp(env);
}
