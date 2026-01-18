import nunjucks from "nunjucks";
import path from "path";
import type { Express } from "express";
import type { Env } from "./env.js";
import { CLIENT_ENTRIES } from "./client-entries.js";

const viewsPath = path.join(process.cwd(), "src/views");

export function configureNunjucks(app: Express, env: Env) {
  const IS_DEV = env.NODE_ENV === "development";

  nunjucks
    .configure(viewsPath, {
      autoescape: true,
      express: app,
      watch: IS_DEV, // uses Chokidar for file changes
    })
    .addGlobal("asset", (path: string) => {
      const cleanBase = env.ASSETS_BASE_URL.replace(/\/$/, "");
      const cleanPath = path.replace(/^\//, "");
      return `${cleanBase}/${cleanPath}`;
    })
    .addGlobal("IS_DEV", IS_DEV)
    .addGlobal("CLIENT_ENTRIES", CLIENT_ENTRIES);
}
