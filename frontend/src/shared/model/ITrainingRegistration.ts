import { IEntity } from "../types/IEntity";
import { IHaveUserId } from "../types/IHaveUserId";
import { TrainingInstanceState } from "../types/TrainingInstanceState";
import { ITrainingSession } from "./ITrainingSession";

/**
 * This interface represents a specific registration of a user on a trainings instance
 */
export interface ITrainingRegistration extends IEntity, IHaveUserId {
  trainingsSession: ITrainingSession;
  trainingsSessionId: string;
  state: TrainingInstanceState;
}
