import { IHaveId } from "../../core/api/types/IHaveId";
import { Subset } from "../../core/types/Subset";
import { IUserRole } from "./IUserRole";

export interface IUserShort extends IHaveId {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  isDeactivated: boolean;
  userRoles: Subset<IUserRole, "id" | "role">[];
  username: string;
}
