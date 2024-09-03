import { Subset } from "../core/Subset";
import { IUserRole } from "../shared/model/IUserRole";
import { AuthRole } from "../shared/types/AuthRole";

export class UserInfo {
  static containsAdminRole(userRoles: IUserRole[]): boolean {
    const index = userRoles.findIndex(
      (userRole) => userRole.role === AuthRole.ADMIN
    );
    return index !== -1;
  }

  static containsAdminRoleFromShort(
    userRoles: Subset<IUserRole, "id" | "role">[]
  ): boolean {
    const index = userRoles.findIndex((row) => row.role === AuthRole.ADMIN);
    return index !== -1;
  }
}
