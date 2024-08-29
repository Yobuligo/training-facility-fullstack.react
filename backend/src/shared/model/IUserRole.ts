import { IEntity } from "../../core/api/types/IEntity";
import { UserRole } from "../types/UserRole";

export interface IUserRole extends IEntity {
  userProfileId: string;
  role: UserRole;
}
