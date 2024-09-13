import { IHaveId } from "../../core/api/types/IHaveId";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { UserInviteType } from "../types/UserInviteType";

export interface IUserInviteShort extends IHaveId, IHaveUserId {
  type: UserInviteType;
  username: string;
}
