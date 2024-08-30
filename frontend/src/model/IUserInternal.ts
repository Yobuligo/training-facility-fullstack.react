import { IHaveId } from "../core/api/types/IHaveId";
import { IUserProfile } from "../shared/model/IUserProfile";
import { IUserRole } from "../shared/model/IUserRole";

export interface IUserInternal extends IHaveId {
  username: string;
  userRoles: IUserRole[];
  userProfile: IUserProfile;
}
