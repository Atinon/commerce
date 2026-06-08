import { Request, Response, NextFunction } from "express";
import { BadRequestError, BaseError } from "../errors/errors.js";
import { ZodError } from "zod";
import { translatePrismaError } from "../errors/prisma-error-handler.js";
import { logger } from "../utils/logger/logger.js";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // TODO: revisit Zod error handling
  if (err instanceof ZodError) {
    err = new BadRequestError(
      err.issues.map((issue) => issue.message).join(","),
    );
  }

  // TODO: revisit Prisma error handling, maybe move to service layer
  err = translatePrismaError(err);

  if (err instanceof BaseError) {
    res.status(err.status).render("error", { err: err });
    return;
  }

  logger.error("Unhandled application error", { err });
  res.status(500).render("500", { message: "Internal Server Error" });
}
