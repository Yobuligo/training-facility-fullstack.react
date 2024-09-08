import { NextFunction, Response } from "express";
import { DateTime } from "../../core/services/date/DateTime";
import { createError } from "../../core/utils/createError";
import { SessionRepo } from "../../repositories/SessionRepo";
import { UserRoleRepo } from "../../repositories/UserRoleRepo";
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
        .status(401)
        .send(createError("No session found", "NoSessionError"));
    }

    // check session
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

    // check authority roles
    if (authRoles && authRoles.length > 0) {
      const userRoleRepo = new UserRoleRepo();
      const hasAuthRole = await userRoleRepo.hasAuthRole(
        session.userId,
        authRoles
      );

      if (!hasAuthRole) {
        return res
          .status(403)
          .send(createError("Missing authority", "MissingAuthorityError"));
      }
    }

    const sessionRequest = req as ISessionRequest;
    sessionRequest.session = session;
    await requestHandler(sessionRequest, res, next);
  });
};
