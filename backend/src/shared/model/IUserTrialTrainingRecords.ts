import { IRouteMeta } from "./../../core/api/types/IRouteMeta";
import { IHaveName } from "../types/IHaveName";
import { IUserTrialTrainingRecord } from "./IUserTrialTrainingRecord";

/**
 * An instance of this interface contains all user trial trainings of a specific user
 */
export interface IUserTrialTrainingRecords extends IHaveName {
  email: string;
  userTrialTrainingRecords: IUserTrialTrainingRecord[];
}

export const UserTrialTrainingRecordsMeta: IRouteMeta = {
  path: "/user-trial-training-records",
};
