import bootstrapApp from "../../src/app.js";
import { getEnv } from "../../src/config/index.js";

export async function createTestApp() {
  const env = getEnv();

  return bootstrapApp(env);
}
