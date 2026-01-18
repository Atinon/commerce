import { Request, Response } from "express";
import { NotFoundError } from "../errors/errors.js";

export function notFoundMiddleware(_req: Request, _res: Response){
    throw new NotFoundError("Page not found.");
}