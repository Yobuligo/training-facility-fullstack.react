import { ICredentials } from "../shared/model/ICredentials";
import { IUser } from "../shared/model/IUser";

export interface IUserSecure extends IUser, ICredentials {
  salt: string;
}
