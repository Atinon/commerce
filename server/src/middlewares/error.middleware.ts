import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { BadRequestError, BaseError } from "#errors/errors.js";
import { translatePrismaError } from "#errors/prisma-error-handler.js";
import { logger } from "#utils/logger/logger.js";

const INTERNAL_ERROR_MSG = "Internal Server Error";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isApiRequest = req.originalUrl.startsWith("/api");

  // TODO: revisit Zod error handling
  if (err instanceof ZodError) {
    err = new BadRequestError(
      err.issues.map((issue) => issue.message).join(","),
    );
  }

  // TODO: revisit Prisma error handling, maybe move to service layer
  err = translatePrismaError(err);

  if (err instanceof BaseError) {
    if (isApiRequest) {
      return res.status(err.status).json({
        err: {
          message: err.message,
        },
      });
    }

    return res.status(err.status).render("error", { err });
  }

  logger.error("Unhandled application error", { err });
  if (isApiRequest) {
    return res.status(500).json({
      err: {
        message: INTERNAL_ERROR_MSG,
      },
    });
  }
  return res.status(500).render("500", { message: INTERNAL_ERROR_MSG });
}
