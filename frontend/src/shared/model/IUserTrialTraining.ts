import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { EventRegistrationState } from "../types/EventRegistrationState";
import { IHaveName } from "../types/IHaveName";

/**
 * An instance of this interface represents a trial training
 * from a specific person with firstname and lastname
 * for a specific event instance.
 */
export interface IUserTrialTraining extends IEntity, IHaveName {
  email: string;
  eventInstanceId: string;
  privacyPolicyAccepted: boolean;
  state: EventRegistrationState;
}

export const UserTrialTrainingRouteMeta: IRouteMeta = {
  path: "/user-trial-trainings",
};
