import { NextFunction, Response } from "express";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";
import { DateTime } from "../../core/services/date/DateTime";
import { createError } from "../../core/utils/createError";
import { SessionRepo } from "../../repositories/SessionRepo";
import { SessionInfo } from "../../services/SessionInfo";
import { AuthRole } from "../../shared/types/AuthRole";
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
  ) => any,
  authRoles?: AuthRole[]
) => {
  return ErrorInterceptor(async (req, res, next) => {
    const sessionId = req.query.token?.toString();
    if (!sessionId) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED_401)
        .send(createError("No session found", "NoSessionError"));
    }

    // check session
    const sessionRepo = new SessionRepo();
    const session = await sessionRepo.findById(sessionId);
    if (!session) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED_401)
        .send(createError("Invalid session", "InvalidSessionError"));
    }

    // check session expired
    if (DateTime.isBefore(session.expiresAt)) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED_401)
        .send(createError("Session expired", "ExpiredSessionError"));
    }

    const sessionInfo = new SessionInfo(session);

    // check authority roles
    if (authRoles && authRoles.length > 0) {
      const hasAuthRole = await sessionInfo.hasAuthRole(authRoles);
      if (!hasAuthRole) {
        return res
          .status(HttpStatusCode.FORBIDDEN_403)
          .send(createError("Missing authority", "MissingAuthorityError"));
      }
    }

    // attach session info instance to request
    const sessionRequest = req as ISessionRequest;
    sessionRequest.sessionInfo = sessionInfo;
    await requestHandler(sessionRequest, res, next);
  });
};
