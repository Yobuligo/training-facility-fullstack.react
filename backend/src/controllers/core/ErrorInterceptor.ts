import { NextFunction, Request, Response } from "express";
import { RestRequestError } from "../../core/api/errors/RestRequestError";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";
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
      if (error instanceof RestRequestError) {
        console.log(error.message);
        res.status(error.httpStatusCode).send(error.error);
      } else if (isError(error)) {
        console.log(error.message);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500).send(error);
      } else {
        console.log(error);
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR_500)
          .send(createError("Internal server error", "InternalServerError"));
      }
    }
  };
};
