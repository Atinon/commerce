import nunjucks from "nunjucks";
import path from "path";
import type { Express } from "express";
import type { Env } from "./env.js";

const viewsPath = path.join(process.cwd(), "src/views");

export function configureNunjucks(app: Express, env: Env) {
  nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app,
    watch: env.NODE_ENV !== "production", // uses Chokidar for file changes
  });
}
