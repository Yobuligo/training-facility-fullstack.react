import { Subset } from "../core/Subset";
import { IUserProfile } from "../shared/model/IUserProfile";
import { IUserRole } from "../shared/model/IUserRole";
import { AuthRole } from "../shared/types/AuthRole";
import { IHaveName } from "../shared/types/IHaveName";
import { UserProfileImageSize } from "../shared/types/UserProfileImageSize";

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

  static containsTrainerRoleFromShort(
    userRoles: Subset<IUserRole, "id" | "role">[]
  ): boolean {
    const index = userRoles.findIndex((row) => row.role === AuthRole.TRAINER);
    return index !== -1;
  }

  static findUserProfileImageBySize(
    size: UserProfileImageSize,
    userProfile?: IUserProfile
  ): string | undefined {
    const userProfileImage = userProfile?.userProfileImages?.find(
      (userProfileImage) => userProfileImage.size === size
    );
    return userProfileImage?.image.toString();
  }

  static toFullName(object?: IHaveName): string {
    return `${object?.firstname} ${object?.lastname}`;
  }
}
