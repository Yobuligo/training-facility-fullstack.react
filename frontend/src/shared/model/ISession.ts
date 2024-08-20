import { IEntity } from "../types/IEntity";
import { IHaveIsAdmin } from "../types/IHaveIsAdmin";
import { IHaveUserId } from "../types/IHaveUserId";

export interface ISession extends IEntity, IHaveIsAdmin, IHaveUserId {
  expiresAt: Date;
  firstname: string;
  username: string;
}
