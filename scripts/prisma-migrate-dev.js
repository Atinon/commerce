import { compose, dev_env, dev_project } from "./util.js";
import { runCommand } from "./run-command.js";

const command = [
  "docker",
  "compose",

  "-p",
  dev_project,

  "--env-file",
  dev_env,

  ...compose.base,
  ...compose.devApp,
  ...compose.devDb,

  "run",
  "--rm",

  "server",

  "npm",
  "run",
  "prisma:migrate:dev",
];

runCommand(command);
