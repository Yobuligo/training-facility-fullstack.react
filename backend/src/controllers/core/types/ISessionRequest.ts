import { Request } from "express";
import { ISession } from "../../../shared/model/ISession";
import { AuthRole } from "../../../shared/types/AuthRole";

export interface ISessionRequest extends Request {
  /**
   * Finds all auth roles of the user of this session.
   */
  findAuthRoles: () => Promise<AuthRole[]>;

  /**
   * Returns if the user of this session is an admin
   */
  isAdmin: () => Promise<boolean>;

  /**
   * Returns if the user of this session is either the user of the {@link requestedUserId} or an admin, otherwise it returns false.
   */
  isAdminOrYourself: (requestedUserId: string) => Promise<boolean>;

  session: ISession;
}
