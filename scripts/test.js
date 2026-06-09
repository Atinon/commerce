import { compose, test_env, test_project } from "./util.js";
import { runCommand } from "./run-command.js";

const composeArgs = [
  "-p",
  test_project,

  "--env-file",
  test_env,

  ...compose.base,
  ...compose.devApp,
  ...compose.testDb,
];

const testCommand = [
  "docker",
  "compose",

  ...composeArgs,

  "run",
  "--rm",
  "server",

  "npm",
  "run",
  "test",
];

const cleanupCommand = ["docker", "compose", ...composeArgs, "down"];

try {
  runCommand(testCommand);
} finally {
  try {
    runCommand(cleanupCommand);
  } catch (err) {
    console.error("Failed to clean up test containers.");
    console.error(err);
  }
}
