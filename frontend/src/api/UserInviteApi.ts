import { IUserInvite, UserInviteRouteMeta } from "../shared/model/IUserInvite";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class UserInviteApi extends EntityRepository<IUserInvite> {
  constructor() {
    super(UserInviteRouteMeta);
  }

  async verify(userInviteId: string): Promise<IUserInvite> {
    return await RESTApi.get(`${this.url}/${userInviteId}/verify`);
  }
}
