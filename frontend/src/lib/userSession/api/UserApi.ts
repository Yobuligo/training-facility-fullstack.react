import { EntityRepository } from "../../../api/core/EntityRepository";
import { RESTApi } from "../../../api/core/RESTApi";
import { IUserInternal } from "../../../model/IUserInternal";
import { IUser, UserRouteMeta } from "../../../shared/model/IUser";
import { IUserShort } from "../../../shared/model/IUserShort";
import { hashPassword } from "../../../utils/hashPassword";
import { IAuthentication } from "../shared/model/IAuthentication";
import { IChangeCredentials } from "../shared/model/IChangeCredentials";
import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";

export class UserApi extends EntityRepository<IUser> {
  constructor() {
    super(UserRouteMeta);
  }

  async unlock(userId: string): Promise<boolean> {
    return await RESTApi.post(`${this.url}/${userId}/unlock`);
  }

  async changePassword(
    userId: string,
    username: string,
    password: string,
    newPassword: string
  ): Promise<boolean> {
    const changeCredentials: IChangeCredentials = {
      username,
      password: hashPassword(password),
      newPassword: hashPassword(newPassword),
    };
    return await RESTApi.post(
      `${this.url}/${userId}/changePassword`,
      changeCredentials
    );
  }

  async lock(userId: string): Promise<boolean> {
    return await RESTApi.post(`${this.url}/${userId}/lock`);
  }

  async existsByUsername(username: string): Promise<boolean> {
    return await RESTApi.get(`${this.url}/exists/${username}`);
  }

  async findAllShort(): Promise<IUserShort[]> {
    return await RESTApi.get(`${this.url}/short/all`);
  }

  async findByQuery(query: string): Promise<IUser[]> {
    return await RESTApi.get(`${this.url}`, { urlParams: { query } });
  }

  async findSession(): Promise<IUserInternal | undefined> {
    return await RESTApi.get(`${this.url}/session`);
  }

  async login(username: string, password: string): Promise<ISession> {
    const credentials: ICredentials = {
      username,
      password: hashPassword(password),
    };

    return await RESTApi.post(
      `${this.url}/login`,
      this.createAuthenticationRequest(credentials)
    );
  }

  async logout(): Promise<boolean> {
    return await RESTApi.post(`${this.url}/logout`);
  }

  async register(username: string, password: string): Promise<boolean> {
    const credentials: ICredentials = {
      username,
      password: hashPassword(password),
    };
    return await RESTApi.post(`${this.url}/register`, credentials);
  }

  private createAuthenticationRequest(
    credentials: ICredentials
  ): IAuthentication {
    return { credentials };
  }
}
