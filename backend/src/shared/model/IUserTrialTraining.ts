import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { EventRegistrationState } from "../types/EventRegistrationState";

export interface IUserTrialTraining extends IEntity {
  firstname: string;
  lastname: String;
  email: string;
  eventInstanceId: string;
  state: EventRegistrationState;
}

export const UserTrialTrainingRouteMeta: IRouteMeta = {
  path: "/user-trial-trainings",
};
