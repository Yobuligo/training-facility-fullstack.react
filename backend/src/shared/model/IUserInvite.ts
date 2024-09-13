import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { UserInviteType } from "../types/UserInviteType";

export interface IUserInvite extends IEntity, IHaveUserId {
  expiresAt: Date;
  type: UserInviteType;
}

export const UserInviteRouteMeta: IRouteMeta = { path: "/user-invites" };
