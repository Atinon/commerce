import { compose, test_env, test_project } from "./util.js";
import { runCommand } from "./run-command.js";

const command = [
  "docker",
  "compose",

  "-p",
  test_project,

  "--env-file",
  test_env,

  ...compose.base,
  ...compose.devApp,
  ...compose.testDb,

  "run",
  "--rm",

  "server",

  "npm",
  "run",
  "prisma:migrate:deploy",
];

runCommand(command);
