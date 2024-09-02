import { IHaveId } from "../../../core/api/types/IHaveId";
import { IHaveUserId } from "../../../core/api/types/IHaveUserId";

export interface IUserProfileShort extends IHaveId, IHaveUserId {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  isDeactivated: boolean;
}
