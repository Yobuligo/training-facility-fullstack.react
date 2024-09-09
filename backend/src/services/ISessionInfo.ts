import { ISession } from "../shared/model/ISession";
import { AuthRole } from "../shared/types/AuthRole";

export interface ISessionInfo {
  /**
   * Returns the session.
   */
  readonly session: ISession;

  /**
   * Finds all auth roles of the user of this session.
   */
  findAuthRoles(): Promise<AuthRole[]>;

  /**
   * Returns if the user of this session has at least one of the {@link requiredAuthRoles}.
   */
  hasAuthRole(requiredAuthRoles: AuthRole[]): Promise<boolean>;

  /**
   * Returns if the user of this session is an admin.
   */
  isAdmin(): Promise<boolean>;

  /**
   * Returns if the user of this session is either the owner of the {@link requestedUserId} or an admin, otherwise it returns false.
   */
  isAdminOrYourself(requestedUserId: string): Promise<boolean>;
}
