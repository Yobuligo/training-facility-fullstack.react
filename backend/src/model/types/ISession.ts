import { IHaveUserId } from "../../core/api/types/IHaveUserId";

export interface ISession extends IHaveUserId {
  sid: string;
  expires: Date;
  data?: string;
  createdAt: Date;
  updatedAt: Date;
}
