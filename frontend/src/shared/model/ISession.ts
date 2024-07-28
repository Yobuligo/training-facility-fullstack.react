import { IEntity } from "../types/IEntity";
import { IHaveIsAdmin } from "../types/IHaveIsAdmin";

export interface ISession extends IEntity, IHaveIsAdmin {
  expiresAt: Date;
  userId: string;
  username: string;
}
