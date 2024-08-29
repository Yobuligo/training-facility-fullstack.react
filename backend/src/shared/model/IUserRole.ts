import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { Role } from "../types/Role";

export interface IUserRole extends IEntity, IHaveUserId {
  role: Role;
}
