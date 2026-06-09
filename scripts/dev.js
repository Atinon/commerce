import { checkArgsNotEmpty, compose, dev_env, dev_project } from "./util.js";
import { runCommand } from "./run-command.js";

const extraArgs = process.argv.slice(2);

checkArgsNotEmpty(extraArgs);

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

  ...extraArgs,
];

runCommand(command);
