import { NextFunction, Response } from "express";
import { DateTime } from "../../core/services/date/DateTime";
import { createError } from "../../core/utils/createError";
import { SessionRepo } from "../../repositories/SessionRepo";
import { ErrorInterceptor } from "./ErrorInterceptor";
import { ISessionRequest } from "./types/ISessionRequest";

/**
 * This interceptor is responsible for validating the users session before calling the *{@link requestHandler}*.
 */
export const SessionInterceptor = (
  requestHandler: (
    req: ISessionRequest,
    res: Response,
    next: NextFunction
  ) => any
) => {
  return ErrorInterceptor(async (req, res, next) => {
    const sessionId = req.query.token?.toString();
    if (!sessionId) {
      return res
        .status(401)
        .send(createError("No session found", "NoSessionError"));
    }

    const sessionRepo = new SessionRepo();
    const session = await sessionRepo.findById(sessionId);
    if (!session) {
      return res
        .status(401)
        .send(createError("Invalid session", "InvalidSessionError"));
    }

    if (DateTime.isBefore(session.expiresAt)) {
      return res
        .status(401)
        .send(createError("Session expired", "ExpiredSessionError"));
    }

    const sessionRequest = req as ISessionRequest;
    sessionRequest.session = session;
    await requestHandler(sessionRequest, res, next);
  });
};
