import { ICredentials } from "../shared/model/ICredentials";
import { IError } from "../shared/model/IError";
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
        credentials.username !== "frank" ||
        credentials.password !== "frank"
      ) {
        const error: IError = {
          createdAt: new Date(),
          message: "Invalid username or password.",
        };
        return reject(error);
      }

      resolve({
        id: uuid(),
        createdAt: new Date(),
        expiresAt: new Date(),
        updatedAt: new Date(),
        userId: uuid(),
        username: "frank",
      });
    });
  }

  logout(session: ISession): Promise<boolean> {
    // return this.post(`${this.url}/logout`, session);

    // Todo: replace by productive code
    return new Promise((resolve) => resolve(true));
  }

  register(credentials: ICredentials): Promise<boolean> {
    return this.post(`${this.url}/register`, credentials);
  }
}
