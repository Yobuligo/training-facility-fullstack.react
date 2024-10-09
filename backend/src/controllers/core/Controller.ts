import { Response, Router } from "express";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";
import { createError } from "../../core/utils/createError";
import { ISessionRequest } from "./types/ISessionRequest";

export abstract class Controller {
  readonly router = Router();

  protected sendMissingAuthorityError(res: Response): Response {
    return res
      .status(HttpStatusCode.FORBIDDEN_403)
      .send(createError("Missing authority", "MissingAuthorityError"));
  }

  /**
   * Checks if the user of this session from {@link req} is either the owner of the {@link requestedUserId} or an admin and returns true.
   * Otherwise a missing authority error is send as response and false is returned.
   */
  protected checkIsAdminOrYourself(
    req: ISessionRequest,
    res: Response,
    requestedUserId: string
  ): boolean {
    if (!req.sessionInfo.isAdminOrYourself(requestedUserId)) {
      this.sendMissingAuthorityError(res);
      return false;
    }
    return true;
  }
}
