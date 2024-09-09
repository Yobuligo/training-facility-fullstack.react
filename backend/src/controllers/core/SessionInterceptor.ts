import { NextFunction, Response } from "express";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";
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

    // check authority roles
    let userAuthRoles: AuthRole[] | undefined = undefined;
    if (authRoles && authRoles.length > 0) {
      // find all auth roles of the given user
      const userRoleRepo = new UserRoleRepo();
      userAuthRoles = await userRoleRepo.findByUserId(session.userId);

      // check if user has at least one of the required role
      let hasAuthRole = false;
      for (let i = 0; i < authRoles.length; i++) {
        if (userAuthRoles.includes(authRoles[i])) {
          hasAuthRole = true;
          break;
        }
      }

      if (!hasAuthRole) {
        return res
          .status(HttpStatusCode.FORBIDDEN_403)
          .send(createError("Missing authority", "MissingAuthorityError"));
      }
    }

    // Attach session and functions to find auth roles of users and return if user is an admin
    const sessionRequest = req as ISessionRequest;
    sessionRequest.session = session;
    sessionRequest.findAuthRoles = async (): Promise<AuthRole[]> => {
      // if user auth roles are already loaded return directly, otherwise select them
      if (userAuthRoles) {
        return userAuthRoles;
      } else {
        const userRoleRepo = new UserRoleRepo();
        const authRoles = await userRoleRepo.findByUserId(session.userId);
        return authRoles;
      }
    };
    sessionRequest.isAdmin = async () => {
      const authRoles = await sessionRequest.findAuthRoles();
      const includes = authRoles.includes(AuthRole.ADMIN);
      return includes;
    };

    sessionRequest.isAdminOrYourself = async (
      requestedUserId: string
    ): Promise<boolean> => {
      if (session.userId === requestedUserId) {
        return true;
      }
      return await sessionRequest.isAdmin();
    };

    await requestHandler(sessionRequest, res, next);
  });
};
