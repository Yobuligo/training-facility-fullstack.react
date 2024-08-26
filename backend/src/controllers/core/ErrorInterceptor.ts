import { NextFunction, Request, Response } from "express";
import { createError } from "../../core/utils/createError";
import { isError } from "../../core/utils/isError";

/**
 * This interceptor wraps the call of the *{@link requestHandler}* and throws an internal server error, if the call fails.
 */
export const ErrorInterceptor = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => any
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      if (isError(error)) {
        res.status(500).send(error);
      } else {
        res
          .status(500)
          .send(createError("Internal server error", "InternalServerError"));
      }
    }
  };
};
