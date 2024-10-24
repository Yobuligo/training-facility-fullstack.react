import { IHaveId } from "../../core/api/types/IHaveId";
import { Subset } from "../../core/types/Subset";
import { IHaveName } from "../types/IHaveName";
import { IUserRole } from "./IUserRole";

export interface IUserShort extends IHaveId, IHaveName {
  email: string;
  phone?: string;
  isLocked: boolean;
  resignedAt?: Date;
  userRoles: Subset<IUserRole, "id" | "role">[];
  username: string;
}
