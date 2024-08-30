import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IUserProfile } from "./IUserProfile";
import { IUserRole } from "./IUserRole";

export interface IUser extends IEntity {
  username: string;
  userRoles: IUserRole[];
  userProfile?: IUserProfile;
}

export const UserRouteMeta: IRouteMeta = { path: "/users" };
