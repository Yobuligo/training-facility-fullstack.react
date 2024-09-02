import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { AuthRole } from "../types/AuthRole";

export interface IUserRole extends IEntity, IHaveUserId {
  role: AuthRole;
}
