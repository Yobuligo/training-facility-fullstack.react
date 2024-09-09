import { ISession } from "../shared/model/ISession";
import { AuthRole } from "../shared/types/AuthRole";
import { UserRoleRepo } from "./../repositories/UserRoleRepo";
import { ISessionInfo } from "./ISessionInfo";

export class SessionInfo implements ISessionInfo {
  private userAuthRoles: AuthRole[] | undefined = undefined;

  constructor(readonly session: ISession) {}

  async findAuthRoles(): Promise<AuthRole[]> {
    if (!this.userAuthRoles) {
      const userRoleRepo = new UserRoleRepo();
      this.userAuthRoles = await userRoleRepo.findByUserId(this.session.userId);
      return this.userAuthRoles;
    } else {
      return this.userAuthRoles;
    }
  }

  async hasAuthRole(requiredAuthRoles: AuthRole[]): Promise<boolean> {
    const userAuthRoles = await this.findAuthRoles();
    for (let i = 0; i < requiredAuthRoles.length; i++) {
      if (userAuthRoles.includes(requiredAuthRoles[i])) {
        return true;
      }
    }
    return false;
  }

  async isAdmin(): Promise<boolean> {
    const userAuthRoles = await this.findAuthRoles();
    const includes = userAuthRoles.includes(AuthRole.ADMIN);
    return includes;
  }

  async isAdminOrYourself(requestedUserId: string): Promise<boolean> {
    if (this.session.userId === requestedUserId) {
      return true;
    }
    return await this.isAdmin();
  }
}
