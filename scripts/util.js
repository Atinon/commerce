export const compose = {
  base: ["-f", "docker/compose.yml"],
  devApp: ["-f", "docker/compose.dev.app.yml"],
  devDb: ["-f", "docker/compose.dev.db.yml"],
  testDb: ["-f", "docker/compose.test.db.yml"],
  prod: ["-f", "docker/compose.prod.yml"],
};

export const dev_project = "commerce-dev";
export const dev_env = "server/.env";

export const test_project = "commerce-test";
export const test_env = "server/.env.test";

export const prod_project = "commerce-prod";
export const prod_env = "server/.env.prod";

export function checkArgsNotEmpty(extraArgs) {
  if (extraArgs.length === 0) {
    console.error("Missing docker compose command.");
    process.exit(1);
  }
}
