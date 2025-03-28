import { IHaveName } from "../types/IHaveName";
import { IUserTrialTrainingRecord } from "../model/IUserTrialTrainingRecord";

/**
 * An instance of this interface contains all user trial trainings of a specific user
 */
export interface IUserTrialTrainingRecords extends IHaveName {
  email: string;
  userTrialTrainingRecords: IUserTrialTrainingRecord[];
}
