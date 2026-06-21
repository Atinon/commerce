import bootstrapApp from "../../src/app.js";
import { getEnv } from "#config";

export async function createTestApp() {
  const env = getEnv();

  return bootstrapApp(env);
}
