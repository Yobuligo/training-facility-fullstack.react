import { Subset } from "../core/Subset";
import { IUser } from "../shared/model/IUser";
import { IUserRole } from "../shared/model/IUserRole";
import { AuthRole } from "../shared/types/AuthRole";

export class UserInfo {
  static containsAdminRole(userRoles: IUserRole[]): boolean {
    return this.containsRole(userRoles, AuthRole.ADMIN);
  }

  static containsTrainerRole(userRoles: IUserRole[]): boolean {
    return this.containsRole(userRoles, AuthRole.TRAINER);
  }

  static containsRole(userRoles: IUserRole[], role: AuthRole): boolean {
    const index = userRoles.findIndex((userRole) => userRole.role === role);
    return index !== -1;
  }

  static containsAdminRoleFromShort(
    userRoles: Subset<IUserRole, "id" | "role">[]
  ): boolean {
    const index = userRoles.findIndex((row) => row.role === AuthRole.ADMIN);
    return index !== -1;
  }

  static toFullName(user: IUser): string {
    return `${user.userProfile?.firstname} ${user.userProfile?.lastname}`;
  }
}
