import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";

export interface ISession extends IEntity, IHaveUserId {
  expiresAt: Date;
}
