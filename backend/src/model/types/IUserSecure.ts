import { ICredentials } from "../../shared/model/ICredentials";
import { IUser } from "../../shared/model/IUser";
import { IUserLoginFailAttempt } from "./IUserLoginFailAttempt";

export interface IUserSecure extends IUser, ICredentials {
  salt: string;
  userLoginFailAttempt?: IUserLoginFailAttempt;
}
