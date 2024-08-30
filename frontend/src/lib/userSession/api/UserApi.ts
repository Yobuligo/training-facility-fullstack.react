import { EntityRepository } from "../../../api/core/EntityRepository";
import { RESTApi } from "../../../api/core/RESTApi";
import { IUserInternal } from "../../../model/IUserInternal";
import { IUser, UserRouteMeta } from "../../../shared/model/IUser";
import { IAuthentication } from "../shared/model/IAuthentication";
import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";

export class UserApi extends EntityRepository<IUser> {
  constructor() {
    super(UserRouteMeta);
  }

  async findByIdInternal(userId: string): Promise<IUserInternal | undefined> {
    return (await this.findById(userId, [
      "id",
      "userProfile",
      "userRoles",
      "username",
    ])) as IUserInternal;
  }

  login(credentials: ICredentials): Promise<ISession> {
    return RESTApi.post(
      `${this.url}/login`,
      this.createAuthenticationRequest(credentials)
    );
  }

  logout(session: ISession): Promise<boolean> {
    return RESTApi.post(`${this.url}/logout`, session);
  }

  register(credentials: ICredentials): Promise<boolean> {
    return RESTApi.post(`${this.url}/register`, credentials);
  }

  private createAuthenticationRequest(
    credentials: ICredentials
  ): IAuthentication {
    return { credentials };
  }
}
