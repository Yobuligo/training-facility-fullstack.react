import { IUserInvite, UserInviteRouteMeta } from "../shared/model/IUserInvite";
import { IUserInviteRequestPasswordChange } from "../shared/model/IUserInviteRequestPasswordChange";
import { IUserInviteShort } from "../shared/model/IUserInviteShort";
import { hashPassword } from "../utils/hashPassword";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class UserInviteApi extends EntityRepository<IUserInvite> {
  constructor() {
    super(UserInviteRouteMeta);
  }

  async changePassword(
    userInviteId: string,
    userId: string,
    newPassword: string
  ): Promise<boolean> {
    const userInviteRequestPasswordChange: IUserInviteRequestPasswordChange = {
      newPassword: hashPassword(newPassword),
      userId,
      userInviteId,
    };
    return await RESTApi.post(
      `${this.url}/${userInviteId}/change-password`,
      userInviteRequestPasswordChange
    );
  }

  async verify(userInviteId: string): Promise<IUserInviteShort> {
    return await RESTApi.get(`${this.url}/${userInviteId}/verify`);
  }
}
