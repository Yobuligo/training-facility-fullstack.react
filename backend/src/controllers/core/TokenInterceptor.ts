import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";
import { createError } from "../../core/utils/createError";
import { isError } from "../../core/utils/isError";
import { TokenService } from "../../services/TokenService";
import { ErrorInterceptor } from "./ErrorInterceptor";

export const TokenInterceptor = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => any
) => {
  return ErrorInterceptor(
    async (req: Request, res: Response, next: NextFunction) => {
      const encodedToken = req.headers["authorization"]?.split(" ")[1];
      if (!encodedToken) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED_401)
          .send(createError("No token error", "InvalidTokenError"));
      }

      try {
        const tokenService = new TokenService();
        tokenService.verify(encodedToken);
      } catch (error) {
        if (isError(error)) {
          return res.status(HttpStatusCode.UNAUTHORIZED_401).send(error);
        } else {
          return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR_500)
            .send(createError("Invalid token", "InvalidTokenError"));
        }
      }

      await requestHandler(req, res, next);
    }
  );
};
