import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";
import { UserMeta } from "../shared/model/UserMeta";
import { Repository } from "./core/Repository";

export class UserApi extends Repository<any> {
  constructor() {
    super(UserMeta);
  }

  login(credentials: ICredentials): Promise<ISession> {
    return this.post(`${this.url}/login`, credentials);
  }

  logout(session: ISession): Promise<boolean> {
    return this.post(`${this.url}/logout`, session);
  }

  register(credentials: ICredentials): Promise<boolean> {
    return this.post(`${this.url}/register`, credentials);
  }
}
