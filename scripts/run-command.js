import { execFileSync } from "node:child_process";

export function runCommand(command) {
  execFileSync(command[0], command.slice(1), {
    stdio: "inherit",
  });
}
