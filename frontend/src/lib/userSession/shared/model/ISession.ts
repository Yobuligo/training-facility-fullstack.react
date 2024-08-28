import { IEntity } from "../../../../core/api/types/IEntity";
import { IHaveUserId } from "../../../../core/api/types/IHaveUserId";
import { IHaveIsAdmin } from "../../../../shared/types/IHaveIsAdmin";

export interface ISession extends IEntity, IHaveIsAdmin, IHaveUserId {
  expiresAt: Date;
  firstname: string;
  username: string;
}

export const SessionTokenParamMeta = "token";
