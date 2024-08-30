import { IEntity } from "../../core/api/types/IEntity";
import { IUserProfile } from "./IUserProfile";
import { IUserRole } from "./IUserRole";

export interface IUser extends IEntity {
  username: string;
  userRoles: IUserRole[];
  userProfile?: IUserProfile;
}
