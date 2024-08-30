import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { UserRole } from "../types/UserRole";

export interface IUserRole extends IEntity, IHaveUserId {
  role: UserRole;
}
