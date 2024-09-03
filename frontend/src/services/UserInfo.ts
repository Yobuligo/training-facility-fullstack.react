import { IUser } from "../shared/model/IUser";
import { IUserRole } from "../shared/model/IUserRole";
import { AuthRole } from "../shared/types/AuthRole";

export class UserInfo {
  static isAdmin(user: IUser): boolean {
    if (!user.userRoles) {
      return false;
    }
    return this.containsAdminRole(user.userRoles);
  }

  static containsAdminRole(userRoles: IUserRole[]): boolean {
    const index = userRoles.findIndex(
      (userRole) => userRole.role === AuthRole.ADMIN
    );
    return index !== -1;
  }
}
