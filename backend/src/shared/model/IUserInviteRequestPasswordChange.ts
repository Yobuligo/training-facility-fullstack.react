import { IHaveUserId } from "../../core/api/types/IHaveUserId";

export interface IUserInviteRequestPasswordChange extends IHaveUserId {
  userInviteId: string;
  newPassword: string;
}
