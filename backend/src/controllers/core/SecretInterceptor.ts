import { NextFunction, Request, Response } from "express";
import { AppConfig } from "../../AppConfig";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";
import { createError } from "../../core/utils/createError";
import { ISecretRequest } from "../../shared/model/ISecretRequest";
import { ErrorInterceptor } from "./ErrorInterceptor";

export const SecretInterceptor = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => any
) => {
  return ErrorInterceptor(
    async (req: Request, res: Response, next: NextFunction) => {
      const secretRequest: ISecretRequest<any> | undefined = req.body;
      if (!secretRequest) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED_401)
          .send(createError("No secret error", "NoSecretError"));
      }

      if (secretRequest.sharedKey !== AppConfig.sharedKey) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED_401)
          .send(createError("Invalid secret error", "InvalidSecretError"));
      }

      await requestHandler(req, res, next);
    }
  );
};
