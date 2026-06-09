import { compose, prod_env, prod_project, checkArgsNotEmpty } from "./util.js";
import { runCommand } from "./run-command.js";

const extraArgs = process.argv.slice(2);

checkArgsNotEmpty(extraArgs);

const command = [
  "docker",
  "compose",

  "-p",
  prod_project,

  "--env-file",
  prod_env,

  ...compose.base,
  ...compose.prod,

  ...extraArgs,
];

runCommand(command);
