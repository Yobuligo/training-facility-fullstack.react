import { IError } from "../../../core/types/IError";
import { IAuthentication } from "../shared/model/IAuthentication";
import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";
import { UserRouteMeta } from "../shared/model/UserRouteMeta";
import { uuid } from "../../../utils/uuid";
import { Repository } from "../../../api/core/Repository";
import { RESTApi } from "../../../api/core/RESTApi";

export class UserApi extends Repository<any> {
  constructor() {
    super(UserRouteMeta);
  }

  login(credentials: ICredentials): Promise<ISession> {
    // return this.post(`${this.url}/login`, credentials);

    // Todo: replace by productive code
    return new Promise((resolve, reject) => {
      if (
        (credentials.username !== "frank" ||
          credentials.password !== "frank") &&
        (credentials.username !== "sonja" || credentials.password !== "sonja")
      ) {
        const error: IError = {
          createdAt: new Date(),
          message: "Invalid username or password.",
        };
        return reject(error);
      }

      if (credentials.username === "frank") {
        return resolve({
          id: uuid(),
          createdAt: new Date(),
          expiresAt: new Date(),
          updatedAt: new Date(),
          userId: "3d5b322c-71ae-41c6-a336-0976eccca612",
          firstname: "Frank",
          username: "frank",
          isAdmin: true,
        });
      }

      return resolve({
        id: uuid(),
        createdAt: new Date(),
        expiresAt: new Date(),
        updatedAt: new Date(),
        userId: "b7c64925-3c0b-404d-acac-66f9c5e03ba3",
        firstname: "Sonja",
        username: "sonja",
        isAdmin: false,
      });
    });
  }

  // login(credentials: ICredentials): Promise<ISession> {
  //   return RESTApi.post(
  //     `${this.url}/login`,
  //     this.createAuthenticationRequest(credentials)
  //   );
  // }

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
