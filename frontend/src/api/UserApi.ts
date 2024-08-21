import { ICredentials } from "../shared/model/ICredentials";
import { IError } from "../core/types/IError";
import { ISession } from "../shared/model/ISession";
import { UserMeta } from "../shared/model/UserMeta";
import { uuid } from "../utils/uuid";
import { Repository } from "./core/Repository";

export class UserApi extends Repository<any> {
  constructor() {
    super(UserMeta);
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

  logout(session: ISession): Promise<boolean> {
    // return this.post(`${this.url}/logout`, session);

    // Todo: replace by productive code
    return new Promise((resolve) => resolve(true));
  }

  register(credentials: ICredentials): Promise<boolean> {
    return this.requestPost(`${this.url}/register`, credentials);
  }
}
