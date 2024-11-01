import { IHaveUserId } from "../../core/api/types/IHaveUserId";

export interface IEventDefinitionTrainer extends IHaveUserId{
  eventDefinitionId: string;
}
