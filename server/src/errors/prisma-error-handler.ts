import { Prisma } from "@prisma/client";
import { ConflictError, NotFoundError } from "./errors.js";

export function translatePrismaError(err: unknown) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return new ConflictError("Resource already exists.");
      case "P2025":
        return new NotFoundError("The requested record could not be found.");
      default:
        return err;
    }
  }
  return err;
}
