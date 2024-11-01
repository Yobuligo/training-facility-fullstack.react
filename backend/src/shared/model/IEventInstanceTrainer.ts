import { IHaveUserId } from "../../core/api/types/IHaveUserId";

export interface IEventInstanceTrainer extends IHaveUserId {
  eventInstanceId: string;
}
