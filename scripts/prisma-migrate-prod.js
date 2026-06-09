import { compose, prod_env, prod_project } from "./util.js";
import { runCommand } from "./run-command.js";

const command = [
  "docker",
  "compose",

  "-p",
  prod_project,

  "--env-file",
  prod_env,

  ...compose.base,
  ...compose.prod,

  "run",
  "--rm",

  "server",

  "npm",
  "run",
  "prisma:migrate:deploy",
];

runCommand(command);
