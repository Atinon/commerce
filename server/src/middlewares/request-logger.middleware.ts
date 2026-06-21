import { Request, Response, NextFunction } from "express";
import { logger } from "#utils/logger/logger.js";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = performance.now();
  res.on("finish", () => {
    const duration = Math.round(performance.now() - startTime);

    logger.info(`${req.method} ${req.originalUrl}`, {
      statusCode: res.statusCode,
      durationMs: duration,
    });
  });

  next();
}
