import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/errors.js";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof BaseError) {
    res.status(err.status).render("error", { err: err });
    return;
  }

  console.error(err);
  res.status(500).render("500", { message: "Internal Server Error" });
}
