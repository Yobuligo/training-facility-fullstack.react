import { ICredentials } from "../../shared/model/ICredentials";
import { IUser } from "../../shared/model/IUser";
import { IUserLoginAttempt } from "./IUserLoginAttempt";

export interface IUserSecure extends IUser, ICredentials {
  salt: string;
  userLoginAttempt?: IUserLoginAttempt;
}
