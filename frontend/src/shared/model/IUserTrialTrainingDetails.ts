import { IEventInstance } from "./IEventInstance";
import { IUserTrialTraining } from "./IUserTrialTraining";

export interface IUserTrialTrainingDetails extends IUserTrialTraining {
  eventInstance: IEventInstance;
}
