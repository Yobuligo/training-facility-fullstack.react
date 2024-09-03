import { IHaveId } from "../../core/api/types/IHaveId";

export interface IUserShort extends IHaveId {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  isDeactivated: boolean;
  userRoles: string[];
}
