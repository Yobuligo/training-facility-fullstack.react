import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { UserInviteType } from "../types/UserInviteType";

export interface IUserInvite extends IEntity, IHaveUserId {
  expiresAt: Date;
  type: UserInviteType;
}
