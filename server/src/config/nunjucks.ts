import nunjucks from "nunjucks";
import path from "path";
import type { Express } from "express";
import { NODE_ENVS, type Env } from "./env.js";
import { CLIENT_ENTRIES } from "./client-entries.js";

const viewsPath = path.join(process.cwd(), "src/views");

export function configureNunjucks(app: Express, env: Env) {
  const IS_DEV = env.NODE_ENV === NODE_ENVS.DEVELOPMENT;
  const cleanBase = env.ASSETS_BASE_URL.replace(/\/$/, "");

  nunjucks
    .configure(viewsPath, {
      autoescape: true,
      express: app,
      watch: IS_DEV, // uses Chokidar for file changes
    })
    .addGlobal("asset", (entry: string) => {
      if (IS_DEV) {
        const cleanEntry = entry.replace(/^\//, "");
        return `${cleanBase}/${cleanEntry}`;
      }

      const prodEntryFileName = path
        .basename(entry)
        .replace(/\.(ts|tsx)$/, ".js");
      return `${cleanBase}/assets/${prodEntryFileName}`;
    })
    .addGlobal("IS_DEV", IS_DEV)
    .addGlobal("CLIENT_ENTRIES", CLIENT_ENTRIES)
    .addGlobal("favicon", `${cleanBase}/favicon.ico`);
}
