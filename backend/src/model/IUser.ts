import { IEntity } from "../core/api/types/IEntity";
import { ICredentials } from "../shared/model/ICredentials";

export interface IUser extends IEntity, ICredentials {
  salt: string;
}
