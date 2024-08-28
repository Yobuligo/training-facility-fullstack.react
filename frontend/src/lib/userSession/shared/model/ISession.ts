import { IEntity } from "../../../../shared/types/IEntity";
import { IHaveIsAdmin } from "../../../../shared/types/IHaveIsAdmin";
import { IHaveUserId } from "../../../../shared/types/IHaveUserId";

export interface ISession extends IEntity, IHaveIsAdmin, IHaveUserId {
  expiresAt: Date;
  firstname: string;
  username: string;
}
