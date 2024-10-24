import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { EventRegistrationState } from "../types/EventRegistrationState";
import { IHaveName } from "../types/IHaveName";

export interface IUserTrialTraining extends IEntity, IHaveName {
  email: string;
  eventInstanceId: string;
  state: EventRegistrationState;
}

export const UserTrialTrainingRouteMeta: IRouteMeta = {
  path: "/user-trial-trainings",
};
